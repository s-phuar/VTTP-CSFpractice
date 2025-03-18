# Build angular
FROM node:23 AS ng-build

#ghost directory in docker container
WORKDIR /src

RUN npm i -g @angular/cli

# COPY client/public public , dont use this for older versions of angular
COPY client/src src
COPY client/*.json .
# COPY ALL json files

RUN npm ci
RUN ng build


#Build spring boot
FROM openjdk:23-jdk AS j-build

WORKDIR /src
COPY ecommerce/.mvn .mvn
COPY ecommerce/src src
COPY ecommerce/mvnw .
COPY ecommerce/pom.xml .

# copy from angular 
COPY --from=ng-build /src/dist/client-side/browser/ src/main/resources/static
# COPY --from=ng-build /src/dist/client-side/browser/* src/main/resources/static

#compile mvn project and run as executable
RUN chmod a+x ./mvnw && ./mvnw package -Dmaven.test.skip=true

#copy the JAR file over to the final container
FROM openjdk:23-jdk

WORKDIR /app
COPY --from=j-build /src/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080

ENV SPRING_DATASOURCE_URL=
ENV SPRING_DATASOURCE_USERNAME=
ENV SPRING_DATASOURCE_PASSWORD=


ENV SPRING_DATA_MONGODB_URI=
ENV SPRING_DATA_MONGODB_DATABASE=


EXPOSE ${PORT}

SHELL ["/bin/sh", "-c"]

ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar




# docker image build -t sphuar/csf-day35:v1.0.0 .
# docker run -d -p 12345:8080 sphuar/csf-day35:v1.0.0