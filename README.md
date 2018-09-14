# MMLP Overview

https://intranet.oreilly.com/confluence/pages/viewpage.action?pageId=37031556

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
