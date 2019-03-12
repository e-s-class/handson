## Redis Hands on

####개념
* 분산된 인스턴스 사이에 공유될 cache가 필요하다
* 메모리 저장소이기 때문에, 읽기 쓰기가 빠르다
* Memcached vs redis
  - redis은 다양한 타입을 지원 (Set, List, Hash, Key-value) => 개발이 쉽다
  - 저장소: 데이터를 유지할 수 있다. AOF (즉시 실행), RDB (특정 주기마다) => 디스크에 저장하기 때문에 재기동되도 값을 유지할 수 있다
* 싱글 쓰레드로 동작하기 때문에, 결과라 오래 걸리는 command의 경우 성능 저하의 원인이 된다. => anti pattern 참고
* value에 object를 넣고 싶은 경우, JSON 문자열 저장

####설정
```
$docker pull redis
$docker run -d --hostname redis --name redis -p 6379:6379 redis:latest
```

####실행
```
$docker exec -it redis bash

# redis container
$ redis-cli
```

####command 실습
* https://redis.io/commands
```
# set, get, del
$ set apple "사과"
$ get apple
$ del apple

# sadd, smembers, srem
$ sadd devs "jade"
$ sadd devs "iaan"
$ sadd devs "chloe"
$ smembers devs
$ srem devs "iaan"
$ smembers devs

# db 사용
$select 0
$set devs "hi"
$select 1
$get devs
$set devs "welcome to estore"
$get devs
```

####Anti pattern
```
# db의 모든 key 조회
$keys *

# db 또는 전체 db 삭제
$select 1
$flushdb

$flushAll
```

#### hands-on 실습
fulfilment-service 에서 사용하는 모듈 경량화 버전 사용

* 공통적으로 client 객체 (low level), helper 객체 (redis를 이요한 비지니스 로직결합)
* tests/redis/index.spec.js
