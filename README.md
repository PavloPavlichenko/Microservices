# Microservices

## Встановлення kind

>kind is a tool for running local Kubernetes clusters
>using Docker container “nodes”.
>kind was primarily designed for testing Kubernetes itself, but may be used for local development or CI.

[Посилання на встановлення](https://kind.sigs.k8s.io/docs/user/quick-start/#installation)

## Запуск локального кластеру

### Створення кластеру

```
cd ./Kubernetes/Common
kind create cluster --config ./cluster.yaml
```

### Створення інгресу (ingress-nginx)

```
kubectl apply -f ./ingress.yaml
```

### Створення неймспейсу для додатків

```
kubectl apply -f ./application_namespace.yaml
cd ..
```
## Запуск сервісів та клієнтів

### Запуск бази даних PostgreSQL

```
cd ./Postgres

kubectl apply -f pvc.yaml

kubectl apply -f configmap.yaml

kubectl apply -f deployment.yaml
kubectl apply -f svc.yaml

cd ..
```

### Запуск сервісу з init контейнером

```
cd ./HotelsWebAPI

kubectl apply -f secret.yaml

kubectl apply -f deployment.yaml
kubectl apply -f svc.yaml

// optional ingress rule
kubectl apply -f ing.yaml

cd ..
```

### Запуск сервісу без бази даних

```
cd ./CarsWebAPI

kubectl apply -f deployment.yaml
kubectl apply -f svc.yaml

// optional ingress rule
kubectl apply -f ing.yaml

cd ..
```

### Запуск клієнту для сервісу з базою даних

```
cd ./ReactClient

kubectl apply -f deployment.yaml
kubectl apply -f svc.yaml

// optional ingress rule
kubectl apply -f ing.yaml

cd ..
```

### Запуск клієнту для сервісу без бази даних

```
cd ./ReactCarClient

kubectl apply -f deployment.yaml
kubectl apply -f svc.yaml

// optional ingress rule
kubectl apply -f ing.yaml

cd ..
```

## Доступ до додатків
Якщо були запущені файли зі створенням ingress rules

- WebAPI по готелям - http://localhost/hotels
- WebAPI по машинам - http://localhost/cars
- Клієнт для готелів - http://localhost/client
- Клієнт для машин - http://localhost/car-client
