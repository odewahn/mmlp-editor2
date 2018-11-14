# MMLP Overview

- [Learning path setup documentation](https://intranet.oreilly.com/confluence/pages/viewpage.action?pageId=37031556)
- http://rubaxa.github.io/Sortable/ -- sortable list react widget
- [O'Reilly design system](https://design-system.corp.oreilly.com/getting-started/developers)
- [Medium article on redux](https://medium.com/@tilomitra/building-server-rendered-react-apps-with-nextjs-40313e978cb4)
- [create-next-app tool](https://github.com/segmentio/create-next-app)
- [Video clips content API](https://github.com/safarijv/video-client/blob/master/src/api/contents.js)

- [Material web component library](https://material.io/develop/web/)

- [React Material Web Components](https://jamesmfriedman.github.io/rmwc/) library

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

## Authorizing Kaltura Calls

howdy! can someone help point me in the right direction? I’m trying to figure out where I’d start to use one of the new heron JWTs to get a Kalutura session I can use to play a full video. Here’s the code that does this in the video player now: https://github.com/safarijv/video-client/blob/master/src/api/kaltura.js. I get that you probably have to pass the JWT to this endpoint, but do you all know off the top of your head where I’d find any docs on `/api/v1/player/kaltura_session` and how to use it?

Carl Eberhard [3:58 PM]
I can get you to that endpoint, but there aren’t many docs there

Andrew Odewahn [3:58 PM]
bascially, I’m looking for how this `kalturasessions.session` value is set
Screen Shot 2018-10-26 at 3.46.50 PM.png

cool — thanks, Carl!

Carl Eberhard [3:59 PM]
Here’s where the session is generated: https://github.com/safarijv/heron/blob/develop/heron/player_utils.py#L16
It’s called from here: https://github.com/safarijv/heron/blob/develop/api/views.py#L866
KalturaClient and the method we call in player-utils is required here: https://github.com/safarijv/heron/blob/develop/requirements/base.txt#L184
If you can auth with the JWT to get that endpoint to return a session key, that should work for when you embed the player

If you're authenticated, you can hit https://www.safaribooksonline.com/api/v1/player/kaltura_session/ and you'll get

```
{
expiry: "2018-10-26T20:34:58.135005",
privileges: "sview:*",
session: "djJ8MTkyNjA4MXyl9cvXgf3toOnuE9C9xnc3cPMVHKMsGau5Ev2FOMdnTm2NojqXBJ6PwEoKptmfnBdwNU6Xtj-gHv-FWhS7wPsfwj3ZlU2puo11FDjEuOgi_Q=="
}
```

You'd just want to pass it through in an `Authorization` header as a `Bearer` token, so something like `curl -H "Authorization: Bearer <VERY_LONG_JWT_STRING>" https://www.safaribooksonline.com/...` (edited)

```
http https://www.safaribooksonline.com/api/v1/player/kaltura_session/ \
  'Authorization:  Bearer eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiMTllOTM4NmUtYTk2MC00NDcwLTk3MTItNGVjMDIzODRlM2ZmIiwgImE2ZmQzMDcyLWIxOTMtNGIyOC05NjZhLTUxMDE2OGExZTEwYiJdLCAiZWlkcyI6IHsiaGVyb24iOiAiYTMzNDNjMTEtMjExNi00ZDA3LWIyMzUtYWE3YzE2YTAxNGQ2IiwgImphbnJhaW4iOiAiMTRlYjRhZTEtY2QwYi00NDM1LWEwOTEtNzFlZmQ1YTA3OTRkIn0sICJleHAiOiAxNTQwNTk2OTUxLCAiaW5kaXZpZHVhbCI6IHRydWUsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3NzdGQiOiAidiIsICJlcHVicyI6ICJ2IiwgImxycHRoIjogInYiLCAibHZ0cmciOiAidiIsICJvcmlvbCI6ICJ2IiwgInBseWxzIjogInYiLCAidXNhZ2UiOiAiYyIsICJ1c3JwZiI6ICJjZXYiLCAidmlkZW8iOiAidiJ9LCAic3ViIjogImFlYzAwYTI0LTc3YjAtNGNiYy1iODUwLWRjOGFjMTRkN2U0NCJ9.kzbqxAcPvKhnEGqBQvK1kUUkUoWZJWj--ZN2F1DasEun2rWwFH2VOB6Gze4ewowDQzA_3T2aSLAHixD4I07ucoeMCx856toM1WBIwee6zMRy3zmDESHpRC_kSlTuaQ8nLpGT0h6lSv9fXz2UaqRmj7ymKSi-9JisgGDt77IpgCI'
```

Here it is using cURL:

```
curl -H "Authentication:  eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiMTllOTM4NmUtYTk2MC00NDcwLTk3MTItNGVjMDIzODRlM2ZmIiwgImE2ZmQzMDcyLWIxOTMtNGIyOC05NjZhLTUxMDE2OGExZTEwYiJdLCAiZWlkcyI6IHsiaGVyb24iOiAiYTMzNDNjMTEtMjExNi00ZDA3LWIyMzUtYWE3YzE2YTAxNGQ2IiwgImphbnJhaW4iOiAiMTRlYjRhZTEtY2QwYi00NDM1LWEwOTEtNzFlZmQ1YTA3OTRkIn0sICJleHAiOiAxNTQwNTk2OTUxLCAiaW5kaXZpZHVhbCI6IHRydWUsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3NzdGQiOiAidiIsICJlcHVicyI6ICJ2IiwgImxycHRoIjogInYiLCAibHZ0cmciOiAidiIsICJvcmlvbCI6ICJ2IiwgInBseWxzIjogInYiLCAidXNhZ2UiOiAiYyIsICJ1c3JwZiI6ICJjZXYiLCAidmlkZW8iOiAidiJ9LCAic3ViIjogImFlYzAwYTI0LTc3YjAtNGNiYy1iODUwLWRjOGFjMTRkN2U0NCJ9.kzbqxAcPvKhnEGqBQvK1kUUkUoWZJWj--ZN2F1DasEun2rWwFH2VOB6Gze4ewowDQzA_3T2aSLAHixD4I07ucoeMCx856toM1WBIwee6zMRy3zmDESHpRC_kSlTuaQ8nLpGT0h6lSv9fXz2UaqRmj7ymKSi-9JisgGDt77IpgCI" \
https://www.safaribooksonline.com/api/v1/player/kaltura_session/
```

# Accessing the Portal

Docs

- https://cdn.oreillystatic.com/safari-submission-guides/book/book.html
- https://cdn.oreillystatic.com/safari-submission-guides/video/book.html
- https://cdn.oreillystatic.com/safari-submission-guides/portal/book.html
- https://intranet.oreilly.com/confluence/pages/viewpage.action?pageId=37031556 (for MMLPs)

NB: IMPORTANTSetting

Set status to experimental when you're testing the upload!

There is a `<safari-classification>` tag in the metadata (https://cdn.oreillystatic.com/safari-submission-guides/video/book.html#safari-classification-q8swFVhd)

add `<class scheme="safari-classification">experimental</class>` to that family, ingestion knows not to kick the thing live. It will put it on the QA site, instead!

## Uploading a metadata file

FTP using the hostname "cowbird.seb.safaribooks.com".
safarijv/gibson34

## Kick off the ingestion

Get access to

https://www.qa.safariflow.com/admin/

you can manually kick it into QA from here:

https://www.qa.safariflow.com/admin/ingestion/
