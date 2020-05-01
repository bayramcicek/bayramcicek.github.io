---
layout: post
title:  "Git: commit'ler nasıl geri alınır/silinir?"
date:   2020-04-15 12:25:06 +0300
categories: general
---

Github üzerinde yaptığım son 10 commit'i geri almak yani silmek istedim. Bu işlemin Git versiyon kontrol sistemi üzerinde nasıl yapıldığını araştırdım.

- Öncelikle uzak sunucudaki depoyu yerelinize kopyalayın ve depo dizinine girin:

`$ git clone <link>`

`$ cd ./<depo-adı>`

- Sondan kaçıncı commit'ten itibaren silmeniz gerektiğini öğrenmek için ya Github vb. gibi bir uzak sunucudan bakmalısınız ya da komut satırından şu şekilde bakmalısınız:

`$ git log`

Burada önünüze son commit'ten eskiye doğru giden bir sayfa gelmelidir. Burada kaç commit silmek istediğinizi belirleyin.

- Son 10 commit'i silmek istediğimizi varsayalım.

- Son 10 commit'i silmek için son 12. commit'in commit_ID'sini öğrenmek istiyor olalım:

`$ git log -n 12`

Önünüze çıkan commit'lerde en aşağı indiğinizde bu 12. commit olacaktır. 12. commit'in ID'sini kopyalayın. (örn: df11d552bc6a38e7z3e229f969d44be65ed1998d)

- Aşağıdaki komutu çalıştırdığınızda önünüze son 11 commit'in olduğu bir dosya açılacak:

`git rebase -i df11d552bc6a38e7z3e229f969d44be65ed1998d`

(burada öğrenmiş oluyoruz ki `git rebase -i <x'inci commit_ID>`,  bize son `(x-1)`'inci commit'leri gösteriyor.)

Önünüzdeki dosyada en üstteki commit en eski commit, en alttaki de en yeni yapılmış(son) commit olacaktır. Biz son 10 commit'i silmek istiyorduk. Öyleyse en üstteki commit hariç(çünkü en üstteki commit son 11. commit), altındaki 10 commit'i silip dosyayı kaydedip kapatıyoruz.

(Aslında `git rebase -i x` yazarken sadece silmek istediğimiz commit'lerin gösterilmesini isteyebiliriz fakat son 10 commit'i silmek istediğimizde kalacak sonuncu commit'i görmek, hatalı bir işlem yapılması ihtimalinin önüne geçebilir.)

- İşlemin yapıldığından emin olmak için commit'leri kontrol edelim:

`$ git status`

Burada yerelimizde bulunan commit'lerin uzak sunucudaki commit'lerden 10 geri(behind) olduğunu görmelisiniz ki istediğimiz şey de buydu zaten.

- Son olarak değişiklikleri uzak sunucuya yollayıp uzak sunucudaki sayfanızı yenileyin:

`$ git push -f origin master`

<i>(-f -> force-push, --force)</i>
