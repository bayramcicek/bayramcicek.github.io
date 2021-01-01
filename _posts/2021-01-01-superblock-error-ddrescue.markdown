---
layout: post
title:  "Ddrescue ile HDD Verilerini Kurtarmak"
date:   2021-01-01 18:03:46 +0300
categories: general
---

GNU/Linux cihazları açılırken ekranda yukarıdan aşağı akan kernel mesajları içerisinde `...the superblock is corrupt...` hatasını gördüm. Kullandığım HDD üzerinde daha önce [bad sector][bad_sector] problemi oluşmuştu ve sadece read-only hatası vermişti.

1TB 'lık HDD içinden ayırdığım -temiz ve bad sector içermeyen- 100GB 'lık alanda bu defasında -dosya sistemi ile ilgili metadata bilgilerini içeren- `superblock` adı verilen bloklardan biri bozulmuştu. Bu blok bozulduğunda sisteminiz o bellek alanını tanıyamaz ve terminalden o alanı `mount` etmek istediğinizde ise `the file system structure on disk is corrupt` hatasını alırsınız.

Bu 100GB bozuk bellek alanına erişimim kaybolduğundan `unallocated` olarak bıraktığım 900GB alanın 150GB 'lık alanını ext4 olarak ayırdım. Bu hatalı belleğin temiz alanlarını 150GB 'lık bellek alanına `ddrescue` ile kopyalayarak kurtarmayı düşündüm.

- `$ sudo fdisk -l`

<pre>
Device         Start       End    Sectors  Size  Type
/dev/sdb1       2048 209717247  209715200  100G  Linux filesystem
/dev/sdb2  209717248 524290047  314572800  150G  Linux filesystem
</pre>

Hatalı alan `/dev/sbd1`, yeni alan ise `/dev/sdb2`. Öyleyse `sdb1` alanını `sdb2` alanına kopyalamak gerekir.

- `$ sudo ddrescue -f -n /dev/sdb1 /dev/sdb2 /root/recovery.log`

<p align="center">
  <img src="https://bayramcicek.com.tr/folder/ddrescue/ddrescue_0.png" alt="ddrescue_2"/>
</p>

<br>
Kurtarma işlemi bittiğinde `/dev/sdb2` belleğini mount etmek istediğimde `unable to access location: Structure needs cleaning` hatası ortaya çıktı. Öyleyse dosya sistemini yeniden yapılandırmak gerekir.

- `$ sudo fsck.ext4 -y /dev/sdb2`

Bu işlemi yaptıktan bir süre sonra `sdb2` tekrar hata vermeye başladı. Bu alan çok büyük olduğundan 50GB 'lık yeni bir bellek alanı oluşturup `bad block` içermediğini kontrol ettikten sonra 150GB bellek alanındaki çok az yer kaplayan verileri bu alana kopyalamanın daha sağlıklı olacağını düşündüm. Bu alanda herhangi bir hata olmadığı için problem çözülmüş oldu.

- `$ sudo badblocks -b 4096 -vs /dev/sdb3 > ./bad_blocks.txt`

<p align="center">
  <img src="https://bayramcicek.com.tr/folder/ddrescue/ddrescue_1.png" alt="ddrescue_2"/>
</p>

<br>
Bellek alanınız ne kadar büyük olursa kurtarma ve bad block tarama işlemleri o kadar uzun sürer. Bu yüzden belleğinizi olabildiğince ufak bir alana ayırıp neredeyse hiç kullanmayacağınız alanları `unallocated` olarak yapılandırmak diskinizin hatalara karşı daha hızlı cevap vermesini sağlayacaktır.

Yılın ilk günü hard diskinizin bozulması iyi bir yılbaşı hediyesi olmasa da `ddrescue` ile verilerin nasıl kurtarılacağı konusunu öğrenmek iyi bir başlangıç olarak sayılabilir. 

[bad_sector]: https://bayramcicek.com.tr/general/2020/07/11/disk-bad-sector.html
