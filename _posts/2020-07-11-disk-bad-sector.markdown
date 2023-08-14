---
layout: post
title:  "Disk ve Bad Sector Problemi"
date:   2020-07-11 07:52:48 +0300
categories: general
---

Kullandığım cihazda sürekli [şuradaki][read-only-question] `read-only file system` problemini yaşamaktaydım. İlk başta hatanın işletim sisteminin kendisinden geleceğini düşündüm. Daha sonra ise diskin dosya sistemindeki yazılımsal hatalardan dolayı olabileceğini düşündüm ve [şurada][read-only-my-answer] yazdığım adımları uyguladım. Bu adımlar sadece geçici bir süreliğine işe yaradı. Bu yüzden daha uzunca bir araştırma yaptım ve problemin yazılımsal değil diskteki `fiziksel` bir problem olabileceğini öğrendim.

HDD disklerindeki `sector` kısımları zamanla fiziksel olarak zarar görebiliyor. `Bad sector` kısımlarına veri okuma-yazma işlemleri yapılmak istendiğinde işletim sistemi bir problem olduğunu farkediyor ve güvenlik açısından kendisinin yüklü olduğu disk kısmını read-only haline getiriyor. Baştan beri yaşadığım problem buydu.

Bad sector fiziksel bir problem olduğundan aslında bu problemi çözemeyiz fakat bu kullanılamayan sector kısımlarını diskin görmezden gelmesini sağlayıp bu problemden `diski formatlamadığımız sürece` kurtulabiliriz. 

Bad sector'e sahip disk, sistemimde `/dev/sda1` olarak bulunuyor. Bu her cihazda değişiklik gösterebilir.

Diskte ne kadar bad sector olduğunu bulmadan önce diskteki her bir sector'ün boyutunu öğrenmeliyiz.

- `$ sudo tune2fs -l /dev/sda1 | grep -i 'block size'`

<p align="center">
  <img src="../../../../folder/bad-blocks/1-block-size.png" alt="block-size"/>
</p>

<br>
Diskteki bad sector kısımlarının bulunması ve bu kısımların bir dosyaya yazılması gereklidir. Bu işlem için tüm diskin taranması gerektiğinden işlem çok uzun sürebilir. `1TB` boyutundaki bir disk için saatler sürebilir. Bu uzun tarama süresinden kaçınmak için diskimi `100GB` ve `900GB` olarak ayırdım. 900GB'lik kısmı kullanmama gerek olmadığından bu kısmı `GParted` üzerinden `unallocated` olarak formatladım. Diğer 100GB boyutunu da `ext4` olarak formatladım. Böylece sadece 100GB'lik bir alan taranacağından taranma süresi çok daha hızlı olacak. (yaklaşık 40 dakika) 

- `$ sudo badblocks -b 4096 -vs /dev/sda1 > ./bad_blocks.txt`

<p align="center">
  <img src="../../../../folder/bad-blocks/2-search-badblocks.png" alt="search-badblocks"/>
</p>

<br>
Eğer diskteki blok boyutunu öğrenmeden `-b 4096` kısmını ilk yazılan komutta girmeseydik büyük ihtimal `out of range; ignored.` hatası olacaktı.

<p align="center">
  <img src="../../../../folder/bad-blocks/3-block-ignored-error.png" alt="block-ignored-error"/>
</p>

<br>
Tarama bittiğinde kaç adet bad block olduğu gösterilir.

<p align="center">
  <img src="../../../../folder/bad-blocks/4-badblocks-completed.png" alt="badblocks-completed"/>
</p>

<br>
Bad block kısımlarının kaydedildiği `bad_blocks.txt` dosyası.

<p align="center">
  <img src="../../../../folder/bad-blocks/5-badblocks-txt-file.png" alt="badblocks-txt-file"/>
</p>

<br>
Son olarak diskin, hatalı blokları görmezden gelmesi sağlanmalıdır.

- `$ sudo e2fsck -l bad_blocks.txt /dev/sda1`

<p align="center">
  <img src="../../../../folder/bad-blocks/6-badblocks-added.png" alt="badblocks-added"/>
</p>

[read-only-question]: https://askubuntu.com/questions/1041416/apt-update-problem-unlinking-the-file-30-read-only-file-system
[read-only-my-answer]: https://askubuntu.com/questions/1041416/apt-update-problem-unlinking-the-file-30-read-only-file-system/1213927#1213927
