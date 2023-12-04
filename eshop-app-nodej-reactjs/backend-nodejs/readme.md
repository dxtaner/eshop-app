
# eshop-app-nodejs-reactjs backend-nodejs


Bu proje, Express.js kullanılarak geliştirilmiş bir backend sunucu uygulamasını içermektedir. Proje, CORS (Cross-Origin Resource Sharing) desteği, rate limiting, MongoDB veritabanı bağlantısı ve basit bir route yapısı içermektedir.

## Başlangıç

Bu talimatlar, projeyi yerel makinenizde çalıştırmak ve geliştirmek için size rehberlik edecektir.

### Gereksinimler

Bu projeyi çalıştırabilmek için aşağıdaki yazılım ve araçlara ihtiyacınız vardır:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Kurulum

1. Proje dizinine gidin:

    ```bash
    cd proje-dizini
    ```

2. Projedeki bağımlılıkları yüklemek için terminal veya komut istemcisine şu komutu yazın:

    ```bash
    npm install
    ```

3. `.env` dosyasını oluşturun ve gerekli ortam değişkenlerini ayarlayın. Örnek bir `.env` dosyası:

    ```env
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/veritabani-adi
    ```

4. MongoDB veritabanını başlatın.

5. Uygulamayı başlatmak için terminal veya komut istemcisine şu komutu yazın:

    ```bash
    npm start
    ```

Uygulama, belirlediğiniz port üzerinde çalışacaktır. Tarayıcıda `http://localhost:4000` adresine giderek API'yi test edebilirsiniz.

## Kullanım

- API endpoint'leri ve kullanımıyla ilgili detaylı bilgiler için [Routes](./routes/README.md) dosyasına bakın.

## Katkıda Bulunma

1. Bu depoyu klonlayın:

    ```bash
    git clone https://github.com/kullanici/adiniz-proje.git
    ```

2. Yeni bir dal (branch) oluşturun:

    ```bash
    git checkout -b ozellik/descripion
    ```

3. Değişikliklerinizi commit edin:

    ```bash
    git commit -m "Açıklayıcı bir commit mesajı"
    ```

4. Dalınızı ana depo ile birleştirin (merge):

    ```bash
    git merge main
    ```

5. Yeni dalınızı (branch) silin:

    ```bash
    git branch -d ozellik/description
    ```

## Lisans

Bu proje [MIT Lisansı](./LICENSE) altında lisanslanmıştır.
