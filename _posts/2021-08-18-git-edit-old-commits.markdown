---
layout: post
title:  "Git: editing old commits"
date:   2021-08-18 12:37:43 +0300
categories: general
---

- list commit log
<pre>
$ git log
or
$ git log --oneline</pre>

- find SHA-ID of your commit, then:
<pre>
$ git rebase --interactive $SHA^
or
(list last e.g. 3 commit)
$ git rebase -i HEAD~3
</pre>

- Change 'pick' to 'edit' for your commit that you want to edit

- make your changes in files etc.

- add your changes & edit commit message:

<pre>
$ git commit -a --amend
</pre>

- end rebase

<pre>
$ git rebase --continue
</pre>

- or cancel
<pre>
$ git rebase --abort
</pre>

- push changes to remote server
<pre>
git push --force-with-lease &lt;origin&gt; &lt;test-branch&gt;
</pre>

(or `$ ./logerrit submit master` for LibreOffice)