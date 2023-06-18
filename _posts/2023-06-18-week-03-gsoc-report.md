---
layout: post
title:  "Week #3 - GSoC 2023 Weekly Report - Search Field in Options"
date:   2023-06-18 08:23:00 +0300
categories: libreoffice-dev
---

### Current progress for week #3

- The Problem in Options sub-dialogs

I've been working with Options dialog which has more than 30 sub-dialogs. On the left pane of the Options dialog, the TreeView headers and their sub-headers were included in searching. There is no problem here. However, when it comes to adding all sub-dialogs' `labels`, `accessible-names`, `accessible-descriptions` and `tooltip-texts` to the searching, there is a problem arise: When Options dialog opens, it does not initialize all dialogs so it is `NOT` possible to access their methods - until they were clicked manually.

I asked about this problem on `IRC #libreoffice-dev` channel:

<pre style="white-space: pre-wrap">

[11:26:53 AM] &lt;bayramcicek&gt; Hi. Is it possible to fetch all strings(labels), tooltip-texts and accessible-descriptions for a .ui file without initializing its class/ctor?

[11:30:35 AM] &lt;caolanm&gt; bayramcicek, might need more context. We do extract those at build-time for translation purposes for example, but that might not be useful for your case

[11:33:37 AM] &lt;caolanm&gt; solenv/bin/uiex is that thing

[11:33:53 AM] &lt;bayramcicek&gt; caolanm: I'm trying to add search functionality to `Tools > Options` dialog. Options dialog has a lot of sub-dialogs. I need to get all strings(labels), tooltip-texts and accessible-descriptions in each dialog to include them in search function. I think I should write a method for every single dialog to get all strings/desc/tooltips they contain. Is there a better way/approach to do this?

[11:34:45 AM] &lt;caolanm&gt; <b>options dialog is a super-duper pain, cause the various contents of that don't exist until created on-demand when you switch to the page</b>

[11:38:19 AM] &lt;bayramcicek&gt; <b>Exactly. When Options dialog opens, it does not initialize all dialogs so I couldn't access their methods until I click them manually.</b>

[11:40:01 AM] &lt;caolanm&gt; its also what that dialog is (uniquely) one that has a fixed size and doesn't adapt to its contents if there is a page that is too large

[11:43:49 AM] &lt;bayramcicek&gt; caolanm: "solenv/bin/uiex is that thing" -> thanks. I'll check that.

[11:57:36 AM] &lt;caolanm&gt; bayramcicek, yeah, there might be some use in a build-time approach to attempt to build the index of data you need during the build, rather than at runtime.

</pre>

It is not possible to access all sub-dialogs when Options dialog opens. We can only have access to their `pageIDs` and `pageNames(headers)`, but we can't access their methods since they aren't instantiated. Otherwise, fetching the all data we need would be very easy with a method implemented by all dialogs - something like `pPageInfo->m_xPage->getAllTooltips()` etc..

Initializing all dialogs when Options dialog opens is another idea. But this is not a good idea since it takes long to create/initialize all sub-dialogs.

 <br>
 - About `./solenv/bin/uiex` script

 In `./core` directory; e.g. for `optopenclpage.ui` file, running

 <pre>
 $ ./solenv/bin/uiex -i ./cui/uiconfig/ui/optopenclpage.ui -o output.txt
</pre>

 extracts:

{% highlight cpp %}

---

#. QYxCN
#: ../cui/uiconfig/ui/optopenclpage.ui:24
msgctxt "optopenclpage|useopencl"
msgid "Allow use of OpenCL"
msgstr ""

#. MAc4P
#: ../cui/uiconfig/ui/optopenclpage.ui:41
msgctxt "optopenclpage|openclused"
msgid "OpenCL is available for use."
msgstr ""

#. fAEQH
#: ../cui/uiconfig/ui/optopenclpage.ui:53
msgctxt "optopenclpage|openclnotused"
msgid "OpenCL is not used."
msgstr ""

#. xWE5i
#: ../cui/uiconfig/ui/optopenclpage.ui:67
msgctxt "optopenclpage|label1"
msgid "OpenCL Options"
msgstr ""

---

{% endhighlight %}

As far as I understand,  the `./solenv/bin/uiex` script extracts all strings that have 

<pre>
<... translatable="yes" ... >
</pre>

property. This also extracts all `label`, `accessible-name`, `accessible-description` and `tooltip-text` values which are the exact data we need. But this happens only running `./solenv/bin/uiex` script. We need the data at build-time.

<br>
- Extracting the data at build-time

The extraction happens when running `$ make translations`. `$ make` doesn't extract the data. (or - does it ?)

`$ make translations` extracts the all information from the following file extensions. (imho, probably this is why it takes longer than expected - on my computer it took 1 min 56 secs.)

{% highlight cpp %}

    static Command const commands[] = {
        { std::u16string_view(u".hrc"), "hrcex", false },
        { std::u16string_view(u".ulf"), "ulfex", false },
        { std::u16string_view(u".xcu"), "cfgex", false },
        { std::u16string_view(u".xrm"), "xrmex", false },
        { std::u16string_view(u"description.xml"), "xrmex", true },
        { std::u16string_view(u".xhp"), "helpex", false },
        { std::u16string_view(u".properties"), "propex", false },
        { std::u16string_view(u".ui"), "uiex", false },
        { std::u16string_view(u".tree"), "treex", false }
    };

{% endhighlight %}

`$ make translations` extracts all strings into `./workdir/pot/*` directory.

Extraction happens in `handleFile(...)` function at `./l10ntools/source/localize.cxx` ([https://opengrok.libreoffice.org/xref/core/l10ntools/source/localize.cxx?r=eaf07139#189][opengrok-localize-cxx])

The extracted file `./workdir/pot/cui/messages.pot` includes all strings for `.ui` files that inside `./cui/*`. But `messages.pot` also has strings that unnecessary for our case.

I imagine a script similar to `./solenv/bin/uiex` that extracts all `.ui` files that Options dialog has, into a file (xml or txt etc. ?), during `$ make`. Then we can retrieve the data into a vector and use it at run-time (maybe - when options dialog opens ?).

`./workdir/pot/cui/messages.pot` file:

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-03-0-messages-pot.png" alt="w-03-1-messages-pot.png" title="messages.pot file"/>
</p><br>

Debug messages after `$ make translations`:

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-03-1-terminal.png" alt="w-03-2-terminal.png" title="terminal messages after $ make translations"/>
</p><br>

### Summary

- There is a problem with accessing methods of sub-dialogs in Options dialog. (the reason is that the sub-dialogs don’t exist until the page is switched)
- We decided that strings in all `.ui` files will be generated at build-time. (which will be the most challenging part in this project)
- I'll be trying to generate the data at build-time in the following weeks.

<p align="center">
    ***
</p>

Steps for implementing search functionality in “Tools > Options”:

<table style="width:100%">
    <tbody>
        <tr>
            <td style="width:75%">1) Add Search field to “Tools > Options” dialog.</td>
            <td colspan="2"><b>DONE - week #1</b></td>
        </tr>
        <tr>
            <td>2) Include Options treeview into searching.</td>
            <td colspan="2"><b>DONE - week #1</b></td>
        </tr>
        <tr>
            <td>3) Include Sub-tree elements (child nodes) into searching.</td>
            <td><b>DONE - week #2</b></td>
        </tr>
        <tr>
            <td>4) Generate all strings(labels), accessible-names, accessible-descriptions and tooltip-texts of all .ui files in ./cui/* directory, at build-time.</td>
            <td><b>Next step (most challenging part)</b></td>
        </tr>
        <tr>
            <td>5) Fetch the generated data - at run-time.</td>
            <td><b>...</b></td>
        </tr>
        <tr>
            <td>6) Include strings(labels), accessible-names, accessible-descriptions and tooltip-texts into searching.</td>
            <td><b>...</b></td>
        </tr>
        <tr>
            <td>7) Implement highlighting feature - if enough time remains.</td>
            <td><b>...</b></td>
        </tr>
        <tr>
            <td>...</td>
            <td><b>...</b></td>
        </tr>
    </tbody>
</table>

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

[gerrit-152519-patchset-2]: https://gerrit.libreoffice.org/c/core/+/152519/2

[opengrok-localize-cxx]: https://opengrok.libreoffice.org/xref/core/l10ntools/source/localize.cxx?r=eaf07139#189
