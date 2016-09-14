# How to build and run the image of rtmp server?

## Step:
1. CMD `sudo ./build.sh`
2. CMD `nohup ./run.sh`

## Notice:

- #### Using docker command without `sudo` (for secure)
 1. CMD `sudo groupadd docker` (this command can be skipped in normal situation)
 2. CMD `sudo gpasswd -a ${USER} docker`
 3. CMD `sudo service docker restart`
 4. Relogin by user ${USER}
- #### Scripts explanation 
 + #### Dockerfile
   1. Avoid using user root
   2. Volumes should be mounted for presistence and capability
   3. Allocate port 8080 to http service   
   4. Nginx service should be run as a front process instand of daemon (cause by docker's mechanish,
   if there is only one daemon running in a container, it will quit.)
 + #### run.sh
   1. `-d` command defines container running in backgroup
   2. `--rm` command means delete the container when it quit 
   3. `--add-host` command can add items to images'`/etc/hosts`

    
   
 
