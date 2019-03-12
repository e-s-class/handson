# handson

## Docker 기초
#### 많이 사용하는 배경
* monolith vs micro services
* scale up vs scale out
* [docker란 무엇입니까?](https://aws.amazon.com/ko/docker/)

#### hypervisor vs docker
vm은 OS가 동작하는데 필요한 기능들을 guest OS로 들고 있어야 한다. 무겁다
container는 host os를 공유한다. vm보다 성능이 좋다.

#### 환경설정 (mac)
* docker desktop app 설치 및 구동확인  (맥에서 가상화환경을 사용하기 위해 도커 엔진 설치)
```
$ docker version
# -i: tty 모드, -t: 대화형 세션, -h: host명
$ docker exec -it redis bash
```

#### Dockerfile
* 도커 이미지를 생성하기 위한 절차를 담고 있는 텍스트 파일
* 교육 중 진행한 sample 프로젝트를 docker로 실행한다.

```
#Dockerfile: sample project
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist/ /usr/share/nginx/html
```
```
#로컬에 image file 생성 [name]:[tag]
$docker build -t sample
```

#### Docker image
* 여러 계층으로 구성되어 있다.
* 각 계층은 읽기 전용 파일 시스템에 있다.
* 계층은 도커파일에 있는 명령마다 생성되며, 이전 계층 위에 위치하게 된다.
```
$docker images
$docker rmi [이미지명]
## UFS (유니온 파일 시스템, 유니온 마운트), 여러 개의 파일 시스템을 겹칠 수 있도록 해준다.
$docker info | grep "Storage Driver"
```

#### Container
```
## 많이 사용하는 command 기준으로 설명
$docker run -h sample-web -p 9080:80 -d sample
$docker ps
$docker stop [컨테이너명 | 컨테이너 ID]
$docker ps -a
$docker start [컨테이너명 | 컨테이너 ID]
$docker rm [컨테이너명 | 컨테이너 ID]
```

#### Docker Registry
이미지를 운영하고 배포하는 역할을 담당하는 서비스, 기본 레지스트리 도커 허브
* docker hub
* private registry

#### 참고
```
#nginx.conf
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        if (!-e $request_filename){
            rewrite ^(.*)$ /index.html break;
        }
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        gzip_static on;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}
    location /api/v1 {
        proxy_pass  http://127.0.0.1:8088;
    }

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

```
* https://www.slideshare.net/pyrasis/docker-fordummies-44424016

