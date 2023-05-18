---
layout: post
title:  "Google Summer of Code 2023 Timeline - Search Field in Options"
date:   2023-05-18 11:18:00 +0300
categories: libreoffice-dev
---

### Project: Search Field in Options

I'll be working on "Search Field in Options" project under the mentorship of Heiko Tietze and Andreas Heinisch throughout the Google Summer of Code 2023 program.

### Timeline

<style>
.center, td:nth-child(2), td:nth-child(3){
  text-align: center;
  vertical-align: middle;
}
</style>

<table>
    <thead>
        <tr class="center">
            <th style="width:25%"># Week</th>
            <th style="width:43%">Tasks</th>
            <th style="width:32%">Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr style="background-color: yellow">
            <td><b>#1</b> (May 29 - June 5)</td>
            <td>Add a seach field to ./cui/uiconfig/ui/optionsdialog.ui</td>
            <td>First week of coding period</td>
        </tr>
        <tr>
            <td><b>#2</b> (June 5 - 12)</td>
            <td rowspan="3">Connect search field(ui) with Visual Class Library (VCL)</td>
            <td rowspan="3">VCL provides a graphical toolkit similar to gtk+, Qt, SWING etc.</td>
        </tr>
        <tr>
            <td><b>#3</b> (June 12 - 19)</td>
        </tr>
        <tr>
            <td><b>#4</b> (June 19 - 26)</td>
        </tr>
        <tr>
            <td><b>#5</b> (June 26 - July 3)</td>
            <td>Start implement seach funtionality</td>
            <td></td>
        </tr>
        <tr>
            <td><b>#6</b> (July 3 - 10)</td>
            <td>Start by searching the treeview</td>
            <td></td>
        </tr>
        <tr style="background-color: yellow">
            <td><b>#7</b> (July 10 - 17)</td>
            <td>Midterm evaluation for contributors and mentors</td>
            <td>Midterm evaluation deadline (July 14 – 18:00 UTC)</td>
        </tr>
        <tr>
            <td><b>#8</b> (July 17 - 24)</td>
            <td>  Iterate over the tabs and match captions as well as tooltip with the search term</td>
            <td rowspan="2">Update UI</td>
        </tr>
        <tr>
            <td><b>#9</b> (July 24 - 31)</td>
            <td>Expand the search functionality for every single dialog step by step</td>
        </tr>
        <tr>
            <td><b>#10</b> (July 31 - Aug 7)</td>
            <td>UI: Hide tree nodes where the item is not found</td>
            <td></td>
        </tr>
        <tr>
            <td><b>#11</b> (Aug 7 - 14)</td>
            <td>Code refactoring</td>
            <td></td>
        </tr>
        <tr>
            <td><b>#12</b> (Aug 14 - 21)</td>
            <td>Final implementations</td>
            <td></td>
        </tr>
        <tr style="background-color: yellow;">
            <td><b>#13</b> (Aug 21 - 28)</td>
            <td>Final week: Contributor Final Submission</td>
            <td>Final evaluation deadline (Aug 28 – 18:00 UTC)</td>
        </tr>
        <tr>
            <td>(Aug 28 - Sep 4)</td>
            <td> Mentor Final Evaluation</td>
            <td>Mentor evaluations deadline (Sep 4 – 18:00 UTC)</td>
        </tr>
        <tr>
            <td>(Sep 5, 2023)</td>
            <td>Initial results of Google Summer of Code 2023 announced</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Project Summary

This enhancement aims to provide a search functionality for "Tools > Options". LibreOffice is a complex application with a large and growing number of options. It is not easy to find the right needle in the haystack. Like most other complex applications, it will be valuable and useful enhancement to add a search field to the "Tools > Options" dialog that iterates over the various tabs and filters where the search text is found.

Project page: [https://summerofcode.withgoogle.com/programs/2023/projects/IKtSHIH1][search-field-project-page]

Enhancement request on Bugzilla: [https://bugs.documentfoundation.org/show_bug.cgi?id=49895][tdf#49895]

[search-field-project-page]: https://summerofcode.withgoogle.com/programs/2023/projects/IKtSHIH1

[tdf#49895]: https://bugs.documentfoundation.org/show_bug.cgi?id=49895