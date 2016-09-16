# How to build and run the image of rtmp server?

## Step:
1. CMD `./build.sh`
2. CMD `nohup ./run.sh`

## Notice:

#### Using docker command without `sudo` (for secure)
 1. CMD `sudo groupadd docker` (this command can be skipped in normal situation)
 2. CMD `sudo gpasswd -a ${USER} docker`
 3. CMD `sudo service docker restart`
 4. Relogin by user ${USER}
 
#### Scripts explanation 

##### Dockerfile
 1. Avoid using user root
 2. Volumes should be mounted for presistence and capability
 3. Allocate port 8080 to http service   
 4. Nginx service should be run as a front process instand of daemon (cause by docker's mechanish,
 if there is only one daemon running in a container, it will quit.)

##### run.sh
 1. `-d` command defines container running in backgroup
 2. `--rm` command means delete the container when it quit 
 3. `--add-host` command can add items to images'`/etc/hosts`

#### Install private docker hub and use pull and push command
 1. CMD `docker pull distribution/registry:2`
 2. CMD `docker run -d -v /opt/registry:/var/lib/registry -p 5000:5000 --restart=always --name registry distribution/registry:2`
 3. Append `DOCKER_OPTS="--registry-mirror=http://ip:5000 --insecure-registry=ip:5000"` to `/etc/default/docker`
 4. CMD `docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]`
 5. CMD `docker push [REGISTRYHOST/][USERNAME/]NAME[:TAG]`
 6. CMD `docker push [REGISTRYHOST/][USERNAME/]NAME[:TAG]` in another host
 
