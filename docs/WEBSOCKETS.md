# WebSockets

Summary: How to name your WebSocket messages

All apps and services in this architecture use WebSockets to communicate between
each other. In order for a easy level of interoperability, we've come up with a
short set of standards.

## Topics

There are two types of topics:

### Events

These are expressions of information - something has changed in the state of
your app or service.

### Commands

An app or service wishes to make a change in the state of another.

### Valid topic names

A topic must consist of three parts:

`programme-name/command-or-event/topic-name`

`programme-name` and `topic-name` can be lowercase letters, numbers or hyphens but must start with a lowercase letter.

`command-or-event` must be either `command` or `event`.

The three parts of a topic must be separated by `/`.

### Examples

The topic required to command the `downloader` service to download a link
would be: `downloader/command/request`. Once the file has been downloaded, the
service would respond with a message on the topic `downloader/event/available`.

A list of applicable topics should be available in each service's `README`.

## Payloads

A payload is a piece of data associated to the topic. It must be JSON encoded.

## Library

There is a WebSocket library written in JavaScript available at
`shared/websockets`. This is installed as an NPM module for all services, and
mounted at `/websocket` for all apps. Please refer to the library's
[README](../shared/websocket/README.md) for usage information.
