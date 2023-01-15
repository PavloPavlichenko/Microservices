helm dep update helm
helm dep build helm
helm upgrade --install local helm --namespace application --create-namespace