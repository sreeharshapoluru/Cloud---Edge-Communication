#!/usr/bin/env python
from threading import Thread
import socket
import ctypes
import sys
TCP_IP = '192.168.0.17'
TCP_PORT = 3333      
BUFFER_SIZE = 200 
xinu_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
xinu_sock2 = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_address = ("192.168.0.50", 1234)
tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
class edgeClass():
	def cloud_listen(self):
		while 1:
			print "waiting for data from cloud"
			conn,addr = tcp_socket.accept()
			print 'Connection address:', addr
			data = conn.recv(BUFFER_SIZE)
			if not data : break
			try:
				length=len(data)
				data1=str(length)+' '+data							
				print >>sys.stderr, 'sending to xinu "%s"' % data1
				sent = xinu_sock.sendto(data1, server_address)
				print >>sys.stderr, 'sent to xinu'
				xinu_sock.settimeout(5.0)
				data2, server = xinu_sock.recvfrom(4096)
				
				print >>sys.stderr, 'received data from xinu, sending to cloud "%s"' % data2
				conn.send(data2)
			finally:
				print >>sys.stderr, 'served a cloud request'	
				conn.close()		
		
	def xinu_listen(self):
		while 1:
			try:
				
				print >>sys.stderr, 'waiting to receive from xinu'
				data1, server = xinu_sock.recvfrom(4096)
				print >>sys.stderr, 'received from xinu: "%s"' % data1
				
				conn.send(data1)
			finally:
				print >>sys.stderr, 'served a request'


if __name__=="__main__": 
	Yep = edgeClass()
	tcp_socket.bind((TCP_IP, TCP_PORT))
	tcp_socket.listen(1)
	thread = Thread(target = Yep.cloud_listen)
  	#thread2 = Thread(target = Yep.xinu_listen)
	
	#print 'connected to :', addr
	thread.start()
	#thread2.start()
	thread.join()
	#thread2.join()
	
