FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /source

COPY *.csproj .
RUN dotnet restore --use-current-runtime

COPY . .
RUN dotnet publish -c Release -o /app
COPY config.properties /app

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "Consumer.dll"]