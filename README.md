A simple hello world express server. 
docker build -t imagebackendmspr .
docker tag imagebackendmspr europe-west9-docker.pkg.dev/idyllic-now-420018/mspr-backend^^^^/imagebackendmspr
docker push europe-west9-docker.pkg.dev/idyllic-now-420018/mspr-backend^^^^/imagebackendmspr