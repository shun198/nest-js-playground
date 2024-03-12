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
- app.controller.spec.ts
  - The unit tests for the controller.
- app.module.ts
  - The root module of the application.
- app.service.ts
  - A basic service with a single method.
- main.ts
  - The entry file of the application which uses the core function NestFactory to create a Nest application instance.

# Controller

- ルーティングを担当する箇所

# Module

- Controller と Service を紐づける場所

# Service

- Provider とも呼ばれている
- API のロジックを描く場所
- Django でいう view に該当するもの

# Exception Filter

- 例外を処理する機能
- Slack 通知などに使えそう

# Pipe

- バリデーションを行う
- Django でいう serializer
- 九つの組み込みの Pipe が存在する:
  - ValidationPipe
  - ParseIntPipe
  - ParseFloatPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
  - ParseEnumPipe
  - DefaultValuePipe
  - ParseFilePipe

# Guard

- (権限やロール、ACL 等の) 特定の条件に応じて、リクエストがハンドラによって処理されるべきかどうかを決定する

# Interceptor

- 以下のことなどが可能
  - メソッドの実行の前後において追加のロジックをバインドする
  - 関数の返り値を変換する
  - 関数から送出された例外を変換する
  - 関数の振る舞いを拡張する(たとえばキャッシュを目的として) 特定の条件に応じて関数をオーバーライドする

# 処理の流れ

Pipe、Guard、Controller、Service、Repository(Database)の順番で機能する
