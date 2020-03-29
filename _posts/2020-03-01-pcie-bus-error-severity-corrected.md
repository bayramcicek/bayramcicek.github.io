---
layout: post
title:  "PCIe Bus Error: severity=Corrected problem after booting into Ubuntu"
date:   2020-03-01 21:18:28 +0300
categories: general
---

- This post is the mirror of [my answer][answer] on StackOverFlow:  

I always have the same issue when reinstall `Ubuntu 18.04.4` with `ASUS X555UQ Laptop`.

Answers of [this][question] question on StackOverFlow helped me a lot about adding which parameter to `/etc/default/grub/` but I can't reach terminal (also tty), because after installing OS via live usb, it gives a blank screen(or mentioned issue) instead of login screen.

Then I thought that I have to get to the GRUB menu at boot-time so, according to this link [how to get to the GRUB menu at boot-time][1], pressing `esc` while booting did not cause the GRUB menu to appear. It shows `please select boot device` section for me.

<p align="center">
  <img src="https://bayramcicek.com.tr/folder/boot-device.jpg" alt="boot-device"/>
</p>

Then I pressed `Enter` to boot again and while booting, pressed `esc` again. Finally it reached to the GRUB menu and I pressed `e` to edit the commands(this page starts with `set params 'Ubuntu'`). Then I added `pci=nomsi` to end of the line starting with `linux` and pressed `F10` to boot.

<p align="center">
  <img src="https://bayramcicek.com.tr/folder/grub.jpg" alt="grub"/>
</p>

<p align="center">
  <img src="https://bayramcicek.com.tr/folder/params.jpg" alt="params"/>
</p>

After this operation, I was able to reach login screen and terminal. Then I followed the [@Ujjal Kumar Das's][2] answer on StackOverFlow and updated my `/etc/default/grub/` file permanently.

Maybe this method works for the users who have the same laptop model like me. I like using Ubuntu, but this issue is so annoying every time.

 
<br>

[question]: https://askubuntu.com/questions/771899/pcie-bus-error-severity-corrected
[1]: https://askubuntu.com/questions/16042/how-to-get-to-the-grub-menu-at-boot-time
[2]: https://askubuntu.com/a/926352/829928
[answer]: https://askubuntu.com/a/1222375/829928
