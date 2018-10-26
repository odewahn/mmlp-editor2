# MMLP Overview

- [Learning path setup documentation](https://intranet.oreilly.com/confluence/pages/viewpage.action?pageId=37031556)
- http://rubaxa.github.io/Sortable/ -- sortable list react widget
- [O'Reilly design system](https://design-system.corp.oreilly.com/getting-started/developers)
- [Medium article on redux](https://medium.com/@tilomitra/building-server-rendered-react-apps-with-nextjs-40313e978cb4)
- [create-next-app tool](https://github.com/segmentio/create-next-app)
- [Video clips content API](https://github.com/safarijv/video-client/blob/master/src/api/contents.js)

- [Material web component library](https://material.io/develop/web/)

# Authentication

This is lame, but you first have to get a session token from

https://http.howard.svc.dev-seb.local/

https://http.videometadataservice.svc.prod-sfo.local/api/v1/

# Direct SOLR search:

Note that you have to be on the right VPN for this to work; I had to be on `sfo-openvpn`, but YMMV.

## Use the SOLR admin to construct a query:

http://index-01.qa.falcon.safaribooks.com:8983/solr/#/collection2/query

Then you can execute specific queries, like this:

## Get a piece of content by its ID

Might use this to grab content for a content preview:

http://index-01.qa.falcon.safaribooks.com:8983/solr/collection2/select?q=id%3Ahttps%3A%2F%2Fwww.qa.safariflow.com%2Fapi%2Fv1%2Fbook%2F9780988820258%2Fchapter%2Ftext%2Fch001.xhtml&wt=json&indent=true

# Search For a Work

## Examples

### Basic query

```
http --verify=no https://falcon.sfo.safaribooks.com/api/v2/search/
```

### Topic Search

```
http --verify=no https://falcon.sfo.safaribooks.com/api/v2/search/ \
   query=="python" \
   | jq .results[0]
```

### Topic search with format

```
http --verify=no https://falcon.sfo.safaribooks.com/api/v2/search/ \
   formats="[video]" \
   query="docker" \
   | jq .results[0]
```

## Parameters that this view accepts are:

- query: The string query for which to search
- field: A specific field used to constrain the search (authors, isbn, publishers, title)
- sort: A sorting method to use (relevance, popularity, date_added, publication_date)
- order: The sort order to use (asc, desc)
- page: The page number of search results to return (ignored when there is one page of results)
- publishers (facet \*): Constrain the search by including a list of publishers
- subjects (facet \*): Constrain the search by including a list of subjects
- topics (facet \*): Constrain the search by including a list of topics
- formats (facet \*): Constrain the search by including a list of formats (e.g., "book", "video")
- languages (facet \*): Constrain the search by including a list of languages (e.g., "en", "de")
- highlight: Highlight search results
- issued_after: Constrain the search to results published after a given date (e.g. "2015-01-01")
- library: Constrain the search to results that are part of a given library (e.g. "default" or "schools"). If not specified, uses the default library + the user's team library (if applicable).
- extended_publisher_data: If true, returns back more data about the publisher (e.g., their "slug").
- include_assessments: If true, returns back self-assessment content (overridden by an explicit formats).
- include_orioles: If true, returns back Oriole content (overridden by an explicit formats).
- include_courses: If true, returns back online training content (overridden by an explicit formats).
- include_playlists: If true, returns back playlist content (overridden by an explicit formats).
- include_facets: If true, returns a facets object in the response.
- fields: A list of field names to include in result objects. The id field will always be added to this list of fields.
- exclude_fields: A list of field names to exclude from result objects. This is ignored if fields is also specified.
- A note about facets: When performing a GET request for faceted search, include facet parameters (e.g., "publishers") like this: &publishers[0]=PublisherOne&publishers[1]=PublisherTwo. When POSTing JSON, you can use normal JSON array notation (e.g., {"publishers": ["PublisherOne", "PublisherTwo"]}

# Search inside the book

Once you find a work you can [search inside it](https://github.com/safarijv/falcon/blob/master/docs/api/sitb.rst).

```
http --verify=no GET https://falcon.sfo.safaribooks.com/api/v2/sitb/ \
   identifier==9781787125933 \
   query==tensorflow \
 | jq .results[0]
```

http --verify=no GET https://falcon.sfo.safaribooks.com/api/v2/sitb/ \
 identifier==9781771374514 \
 query==python

# Kaltura Player

Carl Eberhard [12:24 PM]
Longer form is: the kaltura player uses an old-school pub-sub api and global player factory (`kWidget`) - those can complicate the react wrapper that needs to control it
The short form would be: there’s no great hello-world and the essentials are:

1.  get the factory script on the page (either in your page scripts or load it like we do with something like react-script)
2.  onMount call `kWidget` to create the player, pointing it at a unique dom id and adding a _bunch_ of attributes including autoplay, etc.
3.  optionally include an `onReadyCallback` with the player that will let you control other events (edited)
    (let me check the keys above - which are from memory)
    Here’s the kwidget embed doc I’ve used: http://player.kaltura.com/docs/api#kWidget (edited)
    You can mainly copy the default attributes for this http://player.kaltura.com/docs/api#kWidget.settingsObject from the videoplayer (edited)

Andrew Odewahn [12:30 PM]
Awesome — thanks for all this info, Carl! This will give me plenty to chew on.

Carl Eberhard [12:30 PM]
Let us know if you hit a hurdle on it
And keep in mind, anything more complicated than showing one video get’s dicey fast - do-able, but dicey

Andrew Odewahn [12:31 PM]
are these env values valid for local development: https://github.com/safarijv/video-client/blob/master/env.local
is there any other whitelising or anything (again, this was years ago I looked at this)

Carl Eberhard [12:31 PM]
Those should all work for local (currently)

Andrew Odewahn [12:32 PM]
Great!

Carl Eberhard [12:32 PM]
Hmm. I haven’t hit any allow/disallow list - do you recall anything else about it?

Andrew Odewahn [12:33 PM]
great. I’ll poke around in the examples with this and see where I get — thanks for the quick response
(and, I pretty much just want to be able to play a video — nothing fancy)

Carl Eberhard [12:33 PM]
:thumbsup:

Message Input

Message Carl Eberhard, Jamey DeOrio, katy lavallee
