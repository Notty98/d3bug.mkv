::minikube start
kubectl apply -f .\db-persistent-volume.yaml
kubectl apply -f .\db-persistent-volume-claim.yaml
kubectl apply -f .\db-configmap.yaml
kubectl apply -f .\db-deployment.yaml
kubectl apply -f .\db-service.yaml
kubectl apply -f .\backend-deployment.yaml
kubectl apply -f .\backend-service.yaml
kubectl apply -f .\frontend-deployment.yaml
kubectl apply -f .\frontend-service.yaml
kubectl apply -f .\nginx-configmap.yaml
kubectl apply -f .\nginx-deployment.yaml
kubectl apply -f .\nginx-service.yaml
:: timeout /t 60 /nobreak
:: kubectl port-forward deployment/postgresdb 5433:5432
:: kubectl port-forward deployment/backend 9090:9090
:: kubectl port-forward deployment/frontend 8080:8080
:: kubectl port-forward deployment/nginx 80:80 --address 0.0.0.0

:: docker build -t thenotty/frontend .
:: docker push thenotty/frontend

:: docker build -t thenotty/backend .
:: docker push thenotty/backend

:: minikube start
:: minikube delete
:: minikube start
:: ./deploy.bat
:: minikube dashboard
:: kubectl port-forward deployment/nginx 80:80 --address 0.0.0.0