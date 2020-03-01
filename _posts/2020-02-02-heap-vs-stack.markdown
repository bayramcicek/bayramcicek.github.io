---
layout: post
title:  "Heap vs Stack: Bellek Birimlerine Genel Bakış"
date:   2020-02-02 21:36:01 +0300
categories: general
---

- Stack

`stack`, bilgisayar hafızasının özel bir bölümüdür. Bilgisayar tarafından
kontrol edir yani otomatiktir ve programcı bu alana manuel olarak müdahale etmesi
gerekmez. <i>main()</i> fonksiyonu dahil fonksiyonların ürettiği geçici değerler tutulur.
<i>LIFO (last in, first out)</i> veri yapısına sahiptir.

Fonksiyonların <i>stack</i> bölgesine eklediği veya çıkardığı geçici değişkenler
ölçüsünde <i>stack</i> bölgesi, genişler veya daralır. Değişkenler otomatik olarak tahsis
edilir ve serbest bırakılır. İşletim sistemine bağlı olarak boyut sınırlara sahiptir. <i>Stack</i>
değişkenleri, onları oluşturan fonksiyonlar hayatta	 olduğu sürece vardır.

- Heap

`heap`, bilgisayarın hafızasının otomatik olarak yönetilmediği bölümüdür.
<i>Heap</i> bölümünde bellek tahsisi için `malloc`, `calloc` veya `realloc` fonksiyonları
çağırılmalıdır. Tahsis edilen bellek ünitesi yine manuel olarak `free` ile serbest
bırakılması gerekir. Bu işlemler programcının sorumluluğundadır. Eğer bir hata
çıkarsa buna <i>memory leak</i> denir.

<i>Stack</i> bölümünün aksine <i>heap</i> bölümünde değişkenler üzerinde (fiziksel
sınırlar dışında) bir sınırlama yoktur. <i>Heap</i> bölgesi çok az da olsa <i>stack</i> bölgesine göre
daha yavaştır çünkü <i>heap</i> bölgesine erişim için <i>pointer</i>’lara ihtiyacınız vardır.

<i>Stack</i> bölgesinin aksine <i>heap</i> bölgesinde oluşturulan değişkenler programdaki
herhangi bir fonksiyon tarafından erişilebilir. <i>Heap</i> değişkenleri esasında global
değişkenlerdir. <i>Heap</i>, kendi bölgesinin en etkili bir biçimde kullanıldığını garanti
etmez.

<br>
<p align="center">
  <img src="https://bayramcicek.com.tr/folder/heap_stack.png" alt="heap_stack"/>
</p>

<br>
### Stack – Heap Kullanım Alanları  <br>

Eğer hafızada büyük yer kaplayacak veri yapıları kullanacaksanız (mesela
büyük diziler veya geniş struct yapıları) bu verileri uzun süre tutmak gerektiğinden
heap üzerinde tutmak daha mantıklıdır.

Eğer sadece ilgili fonksiyon çalışırken kullanmamız gereken değişkenlere
sahipsek bunları stack bölümünde tutabiliriz (bu daha hızlı ve basit olur).

Eğer diziler ve struct yapıları gibi boyutları değişmesi muhtemel olan
yapılar kullanılacak ise bunları _heap_	
bölümünde tahsis etmeli ve dinamik bellek tahsisini manuel olarak yönetmemizi sağlayan 
`malloc`, `calloc`, `realloc` ve `free` fonksiyonlarını kullanmamız gerekir.

---
<br>
_2019 güz döneminde hazırladığım dönem sonu bitirme projesinden alıntılanmıştır. Kaynaklar:_<br>

* Ritchie, D.M. ve Kernighan, B.W. 1988. _The C Programming Language_.
Prentice-Hall, Chapter 5, 7, 8 and Appendix B.5

* Gribble, P. (2012). _Memory: Stack vs Heap. Summer 2012_, University of
Western from [https://gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html][memory]

[memory]: https://gribblelab.org/CBootCamp/7_Memory_Stack_vs_Heap.html
