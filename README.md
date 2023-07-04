# Sikayet var test case

[`create-next-app`] - typescript kullanılmıştır.

### Styling

-  `Modular CSS` kullanılmıştır, styling için harici bir kütüphane kullanılmamıştır. Still işlemlerini biraz hızlandırmak için Bootstrap'in grid sistemi yada tailwind kullanılabilirdi.

### Layout

-  Login sayfası gibi `header ve footer` göstermek istemediğimiz sayfalar için bir layout, `dashboard layout` ve `header-footer ` componentlerinin dahil edildiği bir main layout içerir. Toplam 3 layout vardır.

### State managment

-  Auth işlemleri için ve `students` sayfamızın işlemleri için iki farklı Context kullanılmıştır. Proje küçük ölçekli olduğundan redux toolkit gibi araçlar dahil edilmedi fakat kullanılabilir.

### Login

-  Verilen fakeapi'da kullanıcılarda role field'ı olmadığı için `her kullanıcı admin` olarak varsayılmıştır ve giriş yaptıktan sonra dashboard(admin paneline) erişimi vardır.

-  `Kullanıcı henüz giriş yapmadıysa Higher order component, kullanıcının olmasını istediğimiz admin paneli gibi alanlarda koruma sağlar ve kullanıcı yok ise redirect eder.`

-  Kullanıcı hali hazırda giriş yapmış ise tekrar login sayfasına erişemez redirect eder.

-  Cookie verip bir auth state değişikliği için end-point olmadığından, gerçek bir uygulamayı simüle etmek için giriş yapılan kullanıcının bilgileri localStorage'ta tutulmuştur.

### Aşağıdaki bilgiler ile giriş yapabilirsiniz.

```
    username: kminchelle
    password: 0lelplR
```

### Students

-  İlk render'da getServerSideProps ile server side rendering
   yapılmıştır ve repo(gelen response) DashboardContext'indeki students state'ine taşınmıştır. Böylelikle update, delete, create ve search işlemleri DashboardContext üzerinden sağlanmıştır.

-  pagination ve sayfa başına gelecek parametreleri ayarlama işlemleri students sayfasındadır.

-  services dosyasının altında users.ts dosyasında ilgili fetch işlemlerini bulabilirsiniz.
