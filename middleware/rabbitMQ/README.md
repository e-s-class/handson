# RabbitMQ hands on 실습

##1. 배경
* MSA, 서비스간 종속성 제거, 메세지브로커
* [message broker](https://ko.wikipedia.org/wiki/메세지_브로커)

##2. 기초 개념
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

##3. docker 환경설정
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

##4. 실습
실습은 fulfillment-serviced에서 rabbitMQ 부분 경량화 버전을 사용한다.

#### amqplib 모듈
amqplib 모듈이 amqp에 비해 업데이트가 많고, 버그가 적어서 amqp 모듈보다 많이 사용한다

#### 소스 설명
1.  rabbitMQ/messaging/queue
  * publisher - Queue - Consumer 구조  (default exchange를 사용)
```
# messaging/queue/message-comsumer.js
# consume 함수에 두번에 인자인 consumer는 타입이 function 이어야 한다.
ch.comsume(queue, (msg) => {});
```

#### handon 과정
실습은 기본 모듈을 사용해서, sample.js를 생성하는 것으로 진행한다.

1. base model (p-q-c) 실습
2. exchange type에 따라 실습
 * direct : 동일한 파일을 두개 실행, round robin 설명
 * fanout: 하나의 메세지가 두개의 queue에 전달, broadcast 설명
   - 실제로는 다른 서비스가 각각의 consumer가 된다
 * topic: routingKey를 주지 않는다. direct 처럼 동작 (Optional)
   - 실제 서비스에 routingKey를 주는 사례가 없다.
   - rabbitmqadmin은 routinkgKey를 줄수없기 때문에, rabbitMq Manager에서 실습
```
# git tags
v1.0 : p-q-c base model + order-notification(exchange = topic, but work direct)
v2.0 : direct, fanout only queue.txt + need to implementation
v3.0 : direct, fanout implmentation, sample is work
```