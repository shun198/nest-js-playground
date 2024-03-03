ファイル構成

```
└── src
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    └── main.ts
```

- app.controller.spec.ts
  - A basic controller with a single route.
  - ルーティングを担当する箇所
- app.controller.spec.ts
  - The unit tests for the controller.
- app.module.ts
  - The root module of the application.
- app.service.ts
  - A basic service with a single method.
  - Djangoでいうviewに該当するもの
- main.ts
  - The entry file of the application which uses the core function NestFactory to create a Nest application instance.
