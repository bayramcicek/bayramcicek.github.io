---
layout: post
title:  "Final Report - GSoC - 100 Paper Cuts"
date:   2021-08-23 09:03:12 +0300
categories: libreoffice-dev
---

### About project

_100 Paper Cuts_ project aims for improving user interface, implementing enhancement requests and solving most-annoying issues on the UX side of LibreOffice. _100 Paper Cuts_ is a list of bugs and enhancement requests relating to LibreOffice's user experience: [https://wiki.documentfoundation.org/100_Paper_Cuts][paper-cuts]

### Goal

Main goal was to solve as many bugs as I can, but at least 5 bugs, during GSoC.  


### My Work

- In 'Format > Page Style... > Area' Tab, Mouseover effect added to the palettes on Color, Gradient, Bitmap, Pattern and Hatch sections.

- Fixed opposite cropping issue on flipped images in Writer

- In Writer, 3 issues about comment section fixed:

	- comment section scrolls to top of its view
	when clicking inside a comment view.

	- clicking inside a comment view, scrolls the
	view to old cursor location automatically
	(if old cursor out of the visible area)

	- comment section scrolls automatically to the
	old *selected* text (if it's out of visible area)
	when clicking inside the Writer canvas view

- In "Properties sidebar > Cell Appearance", Calc shows preview of the selected cell borders. This feature also added for diagonal borders.

- Calc: added diagonal borders in Toolbar>Borders
	- added diagonal left, diagonal right border and criss-cross border icon to Borders tab
	- added diagonal left and diagonal right borders feature
	- implemented removing diagonal borders when set "no border"
	- added criss-cross line feature
	- added a unit test for diagonal borders

### Commits

- [https://gerrit.libreoffice.org/c/core/+/116395][commit116395] (merged)
- [https://gerrit.libreoffice.org/c/core/+/116770][commit116770] (merged)
- [https://gerrit.libreoffice.org/c/core/+/118638][commit118638] (merged)
- [https://gerrit.libreoffice.org/c/core/+/120519][commit120519] (merged)
- [https://gerrit.libreoffice.org/c/core/+/118951][commit118951] (merged)
- [https://gerrit.libreoffice.org/c/core/+/120262][commit120262] (WIP)

### Bugs

- [https://bugs.documentfoundation.org/show_bug.cgi?id=109388][bug109388] (fixed)
- [https://bugs.documentfoundation.org/show_bug.cgi?id=104995][bug104995] (fixed)
- [https://bugs.documentfoundation.org/show_bug.cgi?id=91519][bug91519] (fixed)
- [https://bugs.documentfoundation.org/show_bug.cgi?id=143890][bug143890] (fixed)
- [https://bugs.documentfoundation.org/show_bug.cgi?id=143919][bug143919] (fixed)

- [https://bugs.documentfoundation.org/show_bug.cgi?id=143300][143300] (reported)

- (Work In Progress): [tdf#51665][tdf#51665]: (WIP) Support diagonal borders in Writer-Tables

- (worked on): [tdf#34438][tdf#34438] - group selection does not work with raster images
	- commented: [https://bugs.documentfoundation.org/show_bug.cgi?id=34438#c47][comment-1]
	- developers decided that get rid of Writer-Images
	- this bug should be done by an experienced developer<br><br>

- (worked on): [tdf#98404][tdf#98404] - UX - While objects on a slide are being edited, the new slide sorter Ctrl+Shift shortcut combinations incorrectly receive focus and move the slide
	- commented: [https://bugs.documentfoundation.org/show_bug.cgi?id=98404#c25][comment-2]


### Whats left to do or can be done?

- [tdf#51665][tdf#51665]: (WIP) Support diagonal borders in Writer-Tables
	- [https://gerrit.libreoffice.org/c/core/+/120262][commit120262]
	- This bug has 2 step: a) implement diagonal borders, b) draw them.
	- I'm workink on this bug for ~4 weeks and it is Work in Progress. Writer-Tables doesn't have diagonal borders feature. I implemented RES_BOX_TLBR attribute and added SID_ATTR_BORDER_DIAG_TLBR for now. After that, we should try to draw them. I'm trying to draw diagonal LEFT border first. If we can draw that, then it becomes easy to apply all the changes to diagonal RIGHT border.
	- If we can add diagonal borders feature, we can also implement criss-cross border feature.
	- In addition to drawing diagonal borders, we should also be able to change their color and style. To apply these 3 things (drawing, color, style), we have to change a lot of things in the codebase. Therefore I think [tdf#51665][tdf#51665] can be a standalone GSoC project itself :) <br><br>

- [tdf#84099][tdf#84099] - Calc can't handle very high rows
	- Scrolling in spreadsheets on Calc is designed to snap to rows. Therefore, this makes it hard to work with spreadsheets with large row heights. This annoying issue is not only specific for vertical scroll but also affects horizontal scroll. If we can add _smooth scroll_ feature, it will likely solve the *height* issue on both rows and columns. <br><br>	

- [tdf#90253][tdf#90253] - Drawing a textbox in Impress doesn't retain its height
	- And, this is another bug that I want to work on it.

### Summary

- total bugs : 8
- fixed : 5
- WIP : 1
- worked on but couldn't fix : 2

I learned lots of things even from the bugs that I couldn't fix. At least, I informed the LibreOffice community about my research and shared the code pointers by commenting on the bug page. Therefore, someone who will work on the bugs that I commented, can easily see the code pointers and my works on it.

<p align="center">
    ***
</p>

I'm very happy that we all reached the end of GSoC. During that time, I know that I had a responsibility for doing everything that I can. Therefore I worked hard, tried to get familiar with the LibreOffice community and worked on as many bugs as I can.

I learned a lot of things during the GSoC. Although GSoC is finished, I will definitely continue to contribute to LibreOffice. I am really happy to be a part of the LibreOffice community and GSoC.

### Thanks

I’m really thankful to LibreOffice and Google for providing us this such a great opportunity which helped me gain this amazing experience!

I always tried to be active on IRC #libreoffice-dev channel, and I want to thank for everybody who helped me about my questions.

And most importantly, greatly thankful to _Muhammet Kara_ and _Heiko Tietze_ which were my mentors throughout the GSoC period. They always guided me everything about my questions. Thank you so much for your guidance, code reviews, time and everything.

Thanks to everyone in the LibreOffice community for their help, I learned a lot from you :)

### All weekly GSoC reports

- 16 Aug 2021   [Week #10 - GSoC Weekly Report - 100 Paper Cuts][w10]
- 08 Aug 2021   [Week #9 - GSoC Weekly Report - 100 Paper Cuts][w9]
- 01 Aug 2021   [Week #7 - #8 - GSoC Weekly Report - 100 Paper Cuts][w7-8]
- 18 Jul 2021   [Week #6 - GSoC Weekly Report - 100 Paper Cuts][w6]
- 11 Jul 2021   [Week #5 - GSoC Weekly Report - 100 Paper Cuts][w5]
- 05 Jul 2021   [Week #3 - #4 - GSoC Weekly Report - 100 Paper Cuts][w3-4]
- 04 Jul 2021   [Week #2 - GSoC Weekly Report - 100 Paper Cuts][w2]
- 13 Jun 2021   [Week #1 - GSoC Weekly Report - 100 Paper Cuts][w1]

**Useful links:**

- [https://gerrit.libreoffice.org/q/owner:bayramcicek2125%2540gmail.com][all-lo-commits] (my all contributions to LibreOffice)
- [https://translations.documentfoundation.org/user/bayramcicek/][weblate] (my translations in LibreOffice)
- [https://bayramcicek.github.io/libreoffice/][lo-category] (all blog posts related to LibreOffice development)
- [https://summerofcode.withgoogle.com/projects/#4776372494401536][gsoc_page] (Google Summer of Code - Project page)

[paper-cuts]: https://wiki.documentfoundation.org/100_Paper_Cuts

[commit116395]: https://gerrit.libreoffice.org/c/core/+/116395
[commit116770]: https://gerrit.libreoffice.org/c/core/+/116770
[commit118638]: https://gerrit.libreoffice.org/c/core/+/118638
[commit120519]: https://gerrit.libreoffice.org/c/core/+/120519
[commit118951]: https://gerrit.libreoffice.org/c/core/+/118951
[commit120262]: https://gerrit.libreoffice.org/c/core/+/120262

[bug109388]: https://bugs.documentfoundation.org/show_bug.cgi?id=109388
[bug104995]: https://bugs.documentfoundation.org/show_bug.cgi?id=104995
[bug91519]: https://bugs.documentfoundation.org/show_bug.cgi?id=91519
[bug143890]: https://bugs.documentfoundation.org/show_bug.cgi?id=143890
[bug143919]: https://bugs.documentfoundation.org/show_bug.cgi?id=143919

[143300]: https://bugs.documentfoundation.org/show_bug.cgi?id=143300

[tdf#51665]: https://bugs.documentfoundation.org/show_bug.cgi?id=51665
[tdf#84099]: https://bugs.documentfoundation.org/show_bug.cgi?id=84099
[tdf#90253]: https://bugs.documentfoundation.org/show_bug.cgi?id=90253

[tdf#34438]: https://bugs.documentfoundation.org/show_bug.cgi?id=34438
[comment-1]: https://bugs.documentfoundation.org/show_bug.cgi?id=34438#c47
[tdf#98404]: https://bugs.documentfoundation.org/show_bug.cgi?id=98404
[comment-2]: https://bugs.documentfoundation.org/show_bug.cgi?id=98404#c25

[w1]: https://bayramcicek.github.io/libreoffice-dev/2021/06/13/week-01-gsoc.html
[w2]: https://bayramcicek.github.io/libreoffice-dev/2021/07/04/week-02-gsoc.html
[w3-4]: https://bayramcicek.github.io/libreoffice-dev/2021/07/05/week-03-04-gsoc.html
[w5]: https://bayramcicek.github.io/libreoffice-dev/2021/07/11/week-05-gsoc.html
[w6]: https://bayramcicek.github.io/libreoffice-dev/2021/07/18/week-06-gsoc.html
[w7-8]: https://bayramcicek.github.io/libreoffice-dev/2021/08/01/week-07-08-gsoc.html
[w9]: https://bayramcicek.github.io/libreoffice-dev/2021/08/08/week-09-gsoc.html
[w10]: https://bayramcicek.github.io/libreoffice-dev/2021/08/16/week-10-gsoc.html

[all-lo-commits]: https://gerrit.libreoffice.org/q/owner:bayramcicek2125%2540gmail.com
[weblate]: https://translations.documentfoundation.org/user/bayramcicek/
[lo-category]: https://bayramcicek.github.io/libreoffice/
[gsoc_page]: https://summerofcode.withgoogle.com/projects/#4776372494401536