---
layout: post
title:  "How to clang-format LibreOffice code-base only for selected code piece(s) - VSCode"
date:   2023-07-08 22:16:00 +0300
categories: libreoffice-dev
---

According to [https://wiki.documentfoundation.org/Development/clang-format][clang-format-lo]:

{% highlight console %}

$ wget https://dev-www.libreoffice.org/bin/clang-format-5.0.0-linux64
$ chmod +x clang-format-5.0.0-linux64
$ sudo mkdir -p /opt/lo/bin/
$ sudo cp clang-format-5.0.0-linux64 /opt/lo/bin/clang-format

{% endhighlight %}

Then, to reformat the whole file:

{% highlight console %}

$ /opt/lo/bin/clang-format -i path/to/thefile.cxx

{% endhighlight %}

We can reformat a file easily. But what if we want to do clang-format only for a specific code-piece(s) (e.g. a function, class, if-else ...) instead?

On `VSCode` (Linux):
- `File` > `Preferences` > `Settings`.
- Search for `clang-format`.
- in `C_Cpp: Clang_format_path` section, set the path of the clang-format executable as `/opt/lo/bin/clang-format`.

For example, let's only select the if statement here:

{% highlight cpp %}
...
    for (PageIdToFileNameMap_Impl& rEntry : FileMap_Impl)
    {
        if    (        rEntry.m_nPageId == nPageId)
        {
            return OStringToOUString(/*...*/);
        }
    }
...
{% endhighlight %}

<br>
Then `right click` on the selection and select `Format Selection`:

<p align="center">
  <img src="../../../../folder/libreoffice-png/format-selection-dialog-vscode.png" alt="format-selection-dialog-vscode.png" title="format-selection-dialog-vscode"/>
</p><br>

Finally, formatting only for if statement should work:

{% highlight cpp %}
...
    for (PageIdToFileNameMap_Impl& rEntry : FileMap_Impl)
    {
        if (rEntry.m_nPageId == nPageId)
        {
            return OStringToOUString(/*...*/);
        }
    }
...
{% endhighlight %}

[clang-format-lo]: https://wiki.documentfoundation.org/Development/clang-format
