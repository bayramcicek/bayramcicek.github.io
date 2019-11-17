---
layout: post
title:  "Extensions, URI, URL and URN"
date:   2019-06-13 13:28:26 +0300
categories: general
---

I’ve never created an extension before, and I’ve created some demo extensions by watching some YT tutorials. YT videos and opera / firefox developer page(s) guide me how to create manifest files, icons, and event pages.

After a few attempts, I finally made an extension called Ekşi Search. Basically, the main idea behind Ekşi Search is selecting a text in any web site and right click then click button.

Extension source code: [github][github]


|Try my first extension at: [opera][op-link] - chrome(removed due to closing google account) - [firefox][fr-link]|

---

<br>
In this study, I learned how to encode a URL by a javascript function:

{% highlight javascript %}
function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}
{% endhighlight %}

For example, `hello world` will interpreted as `hello%20world`.

---

<br>
The encodeURI() function is used to encode a URI. According to [stackoverflow][st]:

- URI (uniform resource identifier) identifies a resource (text document, image file, etc)
- URL (uniform resource locator) is a subset of the URIs that include a network location
- URN (uniform resource name) is a subset of URIs that include a name within a given space, but no location

---

<br>
As an undergraduate student who has just finished 3rd grade, I still feel as a beginner student because when I think ahead, I see that there are lots of things should be learned.

[github]: https://github.com/bayramcicek/eksi-search
[op-link]: https://addons.opera.com/en/extensions/details/eksi-search/
[fr-link]: https://addons.mozilla.org/en-US/firefox/addon/ek%C5%9Fi-search/
[st]: https://stackoverflow.com/a/26410882/10376542