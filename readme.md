# note app
## [Patika.dev](https://patika.dev) 

___
```
-- apps /dizini bütün uygulamaları barındırıyor
    - api  - rest api - microp/typegoose
    - site - front-end - react/redux
...
```

- Bu repository'i klonla
- Projenin root dizininde terminal açın

``` shell
    # at project root

    $ pnpm install

    $ cd apps/api
    $ tsc
    $ node dist

    $ cd apps/site
    $ pnpm dev

```
- visit http://localhost:5171


Bir sebepten dolayı typegoose'un unique constraiti çalışmıyor. Aynı isimle birden fazla kullanıcı yaratmaktan kaçının
acılmış issue yi [buradan](https://github.com/szokodiakos/typegoose/issues/277) görebilirsiniz 
___
licence MIT