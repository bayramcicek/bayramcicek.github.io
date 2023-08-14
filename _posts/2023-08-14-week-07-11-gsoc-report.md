---
layout: post
title:  "Week #7 - #11 - GSoC 2023 Weekly Report - Search Field in Options"
date:   2023-08-14 12:18:00 +0300
categories: libreoffice-dev
---

_Thanks to my 'Search Field in Options' project mentors <u>Andreas Heinisch</u> and <u>Heiko Tietze</u> for their time and guidance._

### Project Report for Week #7 - #11

- A lot of new patchsets submitted (between patchset 10 and 19): [https://gerrit.libreoffice.org/c/core/+/152519][gerrit-152519]

- We decided to implement Plan B(initialize all strings at Options dialog start-up) instead of "extracting strings at build-time" approach.

- all (visible) strings of 69 dialogs included in searching. Currently:
    - labels,
    - check buttons,
    - radio buttons and
    - buttons are included.

TODO: add accessible-names, accessible-descriptions and tooltip-texts into searching.

- `GetAllStrings()` function returns all visible strings. e.g.:

{% highlight cpp %}

OUString ScTpFormulaOptions::GetAllStrings()
{
    OUString sAllStrings;
    OUString labels[] = { "label1", "formulasyntaxlabel",
                          "label3", "label6",
                          "label7", "label8",
                          "label2", "label4",
                          "label9", "label10" };

    for (auto& label : labels)
    {
        if (m_xBuilder->weld_label(label)->is_visible())
            sAllStrings += m_xBuilder->weld_label(label)->get_label() + OUString(' ');
    }

    OUString radioButton[] = { "calcdefault", "calccustom" };

    for (auto& radio : radioButton)
    {
        if (m_xBuilder->weld_radio_button(radio)->is_visible())
            sAllStrings += m_xBuilder->weld_radio_button(radio)->get_label() + OUString(' ');
    }

    OUString button[] = { "reset", "details" };

    for (auto& btn : button)
    {
        if (m_xBuilder->weld_button(btn)->is_visible())
            sAllStrings += m_xBuilder->weld_button(btn)->get_label() + OUString(' ');
    }

    // check button
    if (mxCbEnglishFuncName->is_visible())
        sAllStrings += mxCbEnglishFuncName->get_label() + OUString(' ');

    return sAllStrings.replaceAll("_", "");
}

{% endhighlight %}

<br>
- Some screenshots from the development

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-07-11-0-writer-basic-fonts.png" alt="w-07-11-0-writer-basic-fonts.png" title="writer-basic-fonts"/>
</p><br>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-07-11-1-writer-color.png" alt="w-07-11-1-writer-color.png" title="writer-color"/>
</p><br>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-07-11-2-writer-general.png" alt="w-07-11-2-writer-general.png" title="writer-general"/>
</p><br>

### Summary

- New patchsets submitted (between patchset 10 and 19): [https://gerrit.libreoffice.org/c/core/+/152519][gerrit-152519]
- Implementation of Plan B is completed. (initialize all strings at Options dialog start-up)
- all (visible) strings of 69 dialogs included in searching.:
    - labels,
    - check buttons,
    - radio buttons and
    - buttons are included.

<p align="center">
    ***
</p>

Patch: [https://gerrit.libreoffice.org/c/core/+/152519][gerrit-152519]

Project Mentors: <u>Andreas Heinisch</u> and <u>Heiko Tietze</u> (Thanks for their time and guidance)

GSoC project page: [https://summerofcode.withgoogle.com/programs/2023/projects/IKtSHIH1][search-field-project-page]

Enhancement request on Bugzilla: [https://bugs.documentfoundation.org/show_bug.cgi?id=49895][tdf#49895]

[search-field-project-page]: https://summerofcode.withgoogle.com/programs/2023/projects/IKtSHIH1

[tdf#49895]: https://bugs.documentfoundation.org/show_bug.cgi?id=49895

[gerrit-152519]: https://gerrit.libreoffice.org/c/core/+/152519
