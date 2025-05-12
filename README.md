

## Project setup

Valid for both FE & BE

```bash
$ npm install
```

## Run BE server

```bash
# (preliminary step) set the right path
$ cd backend
```
```bash
# dev
$ npm run start

# dev + watch mode
$ npm run start:dev
```

## Run FE client

```bash
# (preliminary step) set the right path
$ cd frontend
```
```bash
# dev + watch mode
$ npm run dev
```

## Tests

### Back-End

```bash
# (preliminary step) set the right path
$ cd backend
```

#### Run unit tests

```bash
# KpisService.findAll : run once
$ npm run test src/kpis/tests/kpis.service.find-all.spec.ts
# KpisService.findAll : run once + watch mode
$ npm run test:watch src/kpis/tests/kpis.service.find-all.spec.ts

# KpisService.findOne : run once
$ npm run test src/kpis/tests/kpis.service.find-one.spec.ts
# KpisService.findOne : run once + watch mode
$ npm run test:watch src/kpis/tests/kpis.service.find-one.spec.ts

# all unit tests
$ npm run test
```



