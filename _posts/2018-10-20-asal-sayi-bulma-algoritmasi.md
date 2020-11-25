---
layout: post
title:  "Asal Sayı Bulma Algoritması"
date:   2018-10-20 00:33:26 +0300
categories: general
---

-> *8 – 100 arası asal sayıları yazdıran algoritma:*

{% highlight text %}

A1) Başla
A2) i = 8
A3) Eğer TAM(i/2)*2 = i ise A8’e git
A4) Eğer TAM(i/3)*3 = i ise A8’e git
A5) Eğer TAM(i/5)*5 = i ise A8’e git
A6) Eğer TAM(i/7)*7 = i ise A8’e git
A7) i’yi ekrana yaz
A8) Eğer i = 100 ise A10’a git
A9) i = i + 1 al ve A3’e git
A10) Dur

{% endhighlight %}

-> *Akış Şeması / Flowchart:*

<br>
<p align="center">
  <img src="https://bayramcicek.com.tr/folder/prime.png" alt="prime"/>
</p>

---

<br>
Algoritma konusunu daha iyi kavramak için sorularını çözdüğüm projecteuler’deki bir
soruyu, okulda öğrendiğimiz bir algoritma ile çözmeye çalıştım.

Soru: 2000000’dan küçük olan asal sayıların toplamını yazdırınız.

Önce 3–100, sonra 100’ün sağına 0 ekleyerek sayıyı arttırdım:

{% highlight python %}
#!/usr/bin/python3.6
# created by cicek on 20.10.2018 18:50

for i in range(3,100):

	prime = 1

	for k in range(2,i):
		if i % k == 0:
			prime = 0
	if prime != 0:
		print(i)
{% endhighlight %}

Bu algoritma, sadece küçük sayılar için işe yarıyordu. 3–1000000 arası asal sayıları bulması
dakikalar sürüyordu. Biraz iyileştirme ile bu süreyi kısaltmak istedim:

{% highlight python %}
#!/usr/bin/python3.6
# created by cicek on 20.10.2018 18:50

print(2)
for i in range(3, 1000000, 2):

	prime = 1

	for k in range(2, i):
		if i % k == 0:
			prime = 0
			break

		elif (k > (i / 2)):
			break

	if prime != 0:
		print(i)

{% endhighlight %}

Kodun iyileştirilmiş halinde bile sayı büyüdükçe algoritmanın zorlandığını ve 2 milyonu
denediğimde 10’larca dakika geçmesine rağmen sonucu bulamadığını gördüm.

İnternette biraz araştırdığımda en hızlı algoritmalardan birini denedim:

{% highlight python %}

#!/usr/bin/python3.6
# created by cicek on 20.10.2018 08:09

def sumPrimes(n):
	sum, sieve = 0, ([True] * n)

	for p in range(2, n):
		if sieve[p]:
			sum += p

			for i in range(p*p, n, p):
				sieve[i] = False
	return sum

print(sumPrimes(2000000))
{% endhighlight %}

–> sieve dizisine n kadar True ekliyor.<br>
–> İlk bulduğu sayı 2<br>
–> 2’nin katlarına False atıyor.<br>
–> Aynı şekilde 3, 5, 7... ‘yi asal olarak ekledikten sonra, katlarına False atıyor.<br><br>
Böylece asal olmayanlara False atanıyor. Geriye de True, yani asal sayılar kalıyor.
Böylece kodun çalışma süresi 10+ dakikadan 2- saniyeye düştü.
