# RabbitMQ hands on 실습

## 배경
* MSA, 서비스간 종속성 제거, 메세지브로커
* [message broker](https://ko.wikipedia.org/wiki/메세지_브로커)

## 기초 개념
* [RabbitMQ 기본 개념](https://github.com/gjchoi/gjchoi.github.io/blob/master/_posts/2016-02-27-rabbit-mq-이해하기.md)
* Producer, Publish, Queue, Consumer, Subscribe
* Connection, Channel
* Bindings
* Routing
* RoutingKey

#### Exchange Type
* fanout : broadcast
* direct : unicast
* topic : multicast
* header : multicast

## docker 환경설정
```
docker pull rabbitmq
docker run -d -p 5672:5672 -p 15672:15672 --hostname rabbitmq --name rabbitmq -v ~/web:/web -e RABBITMQ_ERLANG_COOKIE='xbV1LB0vXXz5ETh4p2aFdwxbbNwHPtH0dk7jGE4SdYpyeWQn0cX6hx3L5fVuOFnzFCsw0pljvguBEWQIMQtRNNNcCP9RocLRSx1IrcU8XcAxYW4nE4Vd5bOk75tv9Xc7Pe4PfOr6iOvD6Ai8yzDIMTD1vqeA7JVWd16YdFkmrxscTiVRCfzru5MkyW0mMBlsXsR4l7RAj73zHiP1uDdcrR4933I9gB5JSTvdCyNsaA4hBAPSdlAaugIEy9KBqiy' rabbitmq:latest

# Go inside the container
docker exec -it rabbitmq bash

# Run the following command to enable management tool and exit the container
rabbitmq-plugins enable rabbitmq_management
exit

# Run the following command from host machine, in order to get rabbitmqadmin cli (To run this tool we mush python installed locally)
curl -o /usr/local/bin/rabbitmqadmin http://localhost:15672/cli/rabbitmqadmin

chmod 755 /usr/local/bin/rabbitmqadmin

#Command to view users list
rabbitmqadmin list users
```
```
### fulfillment_order_notification
rabbitmqadmin declare exchange name='fulfillment.order_notification' type='topic' durable='true' auto_delete='false'

rabbitmqadmin declare queue name='fulfillment.order_notification' durable='true' auto_delete='false'

rabbitmqadmin declare binding source='fulfillment.order_notification' destination_type='queue' destination='fulfillment.order_notification'

```

## 실습
#### for javascript
fulfilment-service 에서 사용하는 모듈 경량화 버전
1. amqplib 사용
  * rabbitMQ/messaging/queue 디렉토리 message-publisher, message-consumer
  * comsumer는 function 이어야 한다.

2. exchange 예제
  * 클래스 구조 설명
  * rabbitMQ/messaging/exchange/message-consumer.js
  * testcase 돌리고, manager에서 message를 publish해서 메세지 들어오는 것 확인
  * 다른 testcase 하나 더 수행후, round robbin 설명
  * channel 생성 확인
