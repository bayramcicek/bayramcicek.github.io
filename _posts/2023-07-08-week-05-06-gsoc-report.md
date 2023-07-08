---
layout: post
title:  "Week #5 and #6 - GSoC 2023 Weekly Report - Search Field in Options"
date:   2023-07-08 14:39:00 +0300
categories: libreoffice-dev
---

_Thanks to my 'Search Field in Options' project mentors <u>Andreas Heinisch</u> and <u>Heiko Tietze</u> for their time and guidance. Additionally, thanks to <u>Christian Lohmaier</u> for his reviews and comments about text extraction and makefiles._

### Project Report for Week #5 and #6

- New patchsets submitted (between patchset 5 and 10): [https://gerrit.libreoffice.org/c/core/+/152519][gerrit-152519]

- Modified uiex python script to generate ui strings.

I removed the `./solenv/bin/uiex_options` script that almost the same with `./solenv/bin/uiex`. Instead of creating a new script, adding an additional option to the existing uiex script -to only print the msgid instead of the full entry-, is better than a different file.

`./solenv/bin/uiex`:

{% highlight python %}

...

if ( (len(args) != 0) and (args[0] == "getString") ):
    mode = "w"
else:
    mode = "a"

with open(ofile, mode) as output:
    input = check_output(["xgettext", "--add-comments", "--no-wrap", ifile, "-o", "-"], encoding="UTF-8")
    po = polib.pofile(input)
    if len(po) != 0:
        print("", file=output)
        for entry in po:
            # skip 'stock' entries like "cancel", "help", "ok", etc
            # l10ntools/source/localize.cxx will insert one entry for each stock per .po
            if entry.msgctxt == "stock":
                continue
            if (mode == "a"):
                keyid = entry.msgctxt + '|' + entry.msgid
                print('#. ' + polib.genKeyId(keyid), file=output)

            for i, occurrence in enumerate(entry.occurrences):
                entry.occurrences[i] = os.path.relpath(occurrence[0], os.environ['SRCDIR']), occurrence[1]

            if (mode == "a"):
                print(entry, file=output)
            else:
                print(entry.msgid, file=output)

{% endhighlight %}

<br>
- Search function now removes the child-nodes that do not match with the search term.

The search function now gives better results than the previous version.

<br>
<p align="center">
<b>Before:</b> (All child-nodes are shown - which is very confusing)
</p>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-05-06-0-japanese-search-before.png" alt="w-05-06-0-japanese-search-before.png" title="japanese search results - before"/>
</p><br>

<br>
<p align="center">
<b>After:</b> (Child-nodes that do not match with the search term are removed. thus, better results!)
</p>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-05-06-1-japanese-search-after.png" alt="w-05-06-1-japanese-search-after.png" title="japanese search results - after"/>
</p><br>

- Refactored the code with clang-format.

- Search field now goes into focus when Options dialog opens.

{% highlight cpp %}
...
m_xSearchEdit->grab_focus();
SelectHdl_Impl();
{% endhighlight %}

- Finally, first node expands itself and selects its first child automatically after the search done.

{% highlight cpp %}

    // select first child of first node after the search done
    if (nMatchFound != -1)
    {
        std::unique_ptr<weld::TreeIter> xEntry;

        {
            std::unique_ptr<weld::TreeIter> xTemp = xTreeLB->make_iterator();
            bool bTemp = xTreeLB->get_iter_first(*xTemp);
            while (bTemp)
            {
                // select only the first child
                if (xTreeLB->get_iter_depth(*xTemp) && xTreeLB->get_id(*xTemp).toInt64())
                {
                    xEntry = xTreeLB->make_iterator(xTemp.get());
                    break;
                }
                bTemp = xTreeLB->iter_next(*xTemp);
            }
        }

        if (!xEntry)
        {
            xEntry = xTreeLB->make_iterator();
            if (!xTreeLB->get_iter_first(*xEntry) || !xTreeLB->iter_next(*xEntry))
                xEntry.reset();
        }

        if (!xEntry)
            return;

        std::unique_ptr<weld::TreeIter> xParent(xTreeLB->make_iterator(xEntry.get()));
        xTreeLB->iter_parent(*xParent);
        xTreeLB->expand_row(*xParent);
        xTreeLB->scroll_to_row(*xParent);
        xTreeLB->scroll_to_row(*xEntry);
        xTreeLB->set_cursor(*xEntry);
        xTreeLB->select(*xEntry);
        SelectHdl_Impl();
    }

{% endhighlight %}

<br>
- Some screenshots from the development

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-05-06-2-console-debug-nodes.png" alt="w-05-06-2-console-debug-nodes.png" title="console-debug-nodes"/>
</p><br>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-05-06-3-fonts-search-results.png" alt="w-05-06-3-fonts-search-results.png" title="fonts-search-results"/>
</p><br>

<p align="center">
  <img src="../../../../folder/libreoffice-png/w-05-06-4-writer-grid-search-results.png" alt="w-05-06-4-writer-grid-search-results.png" title="writer-grid-search-results"/>
</p><br>

### Summary

- New patchsets submitted (between patchset 5 and 10): [https://gerrit.libreoffice.org/c/core/+/152519][gerrit-152519]
- Modified uiex python script to generate ui strings.
- Search function now removes the child-nodes that do not match with the search term.
    - The search function now gives better results than the previous version.
- Refactored the code with clang-format.
- Search field now goes into focus when Options dialog opens.
- Finally, first node expands itself and selects its first child automatically after the search done.

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
            <td><b>DONE - week #3, #4 (most challenging part)</b></td>
        </tr>
        <tr>
            <td>5) Fetch the generated data - at run-time.</td>
            <td><b>DONE - week #3, #4</b></td>
        </tr>
        <tr>
            <td>6) Include strings(labels), accessible-names, accessible-descriptions and tooltip-texts into searching.</td>
            <td><b>DONE - week #3, #4</b></td>
        </tr>
        <tr>
            <td>7) Refactoring the code-base and trying to fix some issues.</td>
            <td><b>now</b></td>
        </tr>
        <tr>
            <td>8) Implement highlighting feature.</td>
            <td><b>next step</b></td>
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
