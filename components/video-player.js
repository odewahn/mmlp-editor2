/*global kWidget:true*/
/*eslint camelcase: "off"*/
/*eslint no-empty: 'off'*/

import React, { Component } from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";
//import styles from './VideoPlayer.css';

const PREFERED_PLAYBACK_RATE_KEY = "PREFERRED_PLAYBACK_RATE";
const PREFERED_PLAYBACK_QUALITY_KEY = "PREFERED_PLAYBACK_QUALITY";
const CSS_URL =
  "https://www.safaribooksonline.com/static/corp/css/kalturaVideoPlayerTheme.css";

// a -1 value will 'force an auto switching of bit rate'
// http://player.kaltura.com/docs/api#mediaProxy.preferedFlavorBR
// const FORCE_AUTO_BITRATE_SWITCHING = -1;
// but! is broken on android, so use the default listed above instead
const DEFAULT_BITRATE = 1000;

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.handleScriptError = this.handleScriptError.bind(this);
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onStartPlayerClick = this.onStartPlayerClick.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getPreferedPlaybackRate = this.getPreferedPlaybackRate.bind(this);
    this.playFromPercentage = this.playFromPercentage.bind(this);

    const hasChildren = React.Children.count(props.children) > 0;

    this.state = {
      showHero: hasChildren,
      targetId: props.targetId,
      wid: `_${props.partnerId}`,
      uiconf_id: props.uiConfId,
      flashvars: {
        IframeCustomPluginCss1: CSS_URL,
        forceHDS: props.forceHDS,
        autoPlay: props.autoPlay,
        autoMute: props.autoMute,
        referenceId: props.referenceId,
        stretchVideo: props.stretchVideo,
        "mediaProxy.mediaPlayFrom": props.playFrom,
        "mediaProxy.preferedFlavorBR":
          this.getPreferedPlaybackQuality() || props.defaultQuality,
        disableBitrateCookie: true,
        playbackRateSelector: {
          defaultSpeed: this.getPreferedPlaybackRate() || props.defaultSpeed,
          speeds: props.speeds
        },
        sourceSelector: {
          plugin: true,
          switchOnResize: false,
          simpleFormat: true,
          displayMode: "sizebitrate"
        },
        strings: {
          "ks-FREE_PREVIEW_END": props.previewEndDescription,
          "ks-FREE_PREVIEW_END_TITLE": props.previewEndTitle
        }
      },
      params: {
        wmode: "transparent"
      },
      readyCallback: playerId => {
        this.onPlayerReady(playerId);
      }
    };
  }

  getPreferedPlaybackRate() {
    let preferedPlaybackRate = false;
    if (typeof localStorage === "object") {
      try {
        preferedPlaybackRate = localStorage.getItem(PREFERED_PLAYBACK_RATE_KEY);
        preferedPlaybackRate = parseFloat(preferedPlaybackRate);
      } catch (error) {}
    }

    return preferedPlaybackRate;
  }

  getPreferedPlaybackQuality() {
    let preferedPlaybackQuality = false;
    if (typeof localStorage === "object") {
      try {
        preferedPlaybackQuality = parseFloat(
          localStorage.getItem(PREFERED_PLAYBACK_QUALITY_KEY)
        );
      } catch (error) {}
    }
    return preferedPlaybackQuality;
  }

  componentDidUpdate(prevProps) {
    if (this.props.playFromPercentage !== prevProps.playFromPercentage) {
      if (typeof prevProps.playFromPercentage === "number") {
        this.playFromPercentage(prevProps.playFromPercentage);
      }
    }

    const { referenceId } = this.props;
    console.log("Old => ", prevProps.referenceId, "    New => ", referenceId);

    if (referenceId !== prevProps.referenceId) {
      this.setState({
        showHero: hasChildren,
        targetId: props.targetId,
        wid: `_${props.partnerId}`,
        uiconf_id: props.uiConfId,
        flashvars: {
          IframeCustomPluginCss1: CSS_URL,
          forceHDS: props.forceHDS,
          autoPlay: props.autoPlay,
          autoMute: props.autoMute,
          referenceId: props.referenceId,
          stretchVideo: props.stretchVideo,
          "mediaProxy.mediaPlayFrom": props.playFrom,
          "mediaProxy.preferedFlavorBR":
            this.getPreferedPlaybackQuality() || props.defaultQuality,
          disableBitrateCookie: true,
          playbackRateSelector: {
            defaultSpeed: this.getPreferedPlaybackRate() || props.defaultSpeed,
            speeds: props.speeds
          },
          sourceSelector: {
            plugin: true,
            switchOnResize: false,
            simpleFormat: true,
            displayMode: "sizebitrate"
          },
          strings: {
            "ks-FREE_PREVIEW_END": props.previewEndDescription,
            "ks-FREE_PREVIEW_END_TITLE": props.previewEndTitle
          }
        },
        params: {
          wmode: "transparent"
        },
        readyCallback: playerId => {
          this.onPlayerReady(playerId);
        }
      });
      this.switchVideos(referenceId, this.props.playFrom);
    }
  }

  switchVideos(idToSwichTo, playFrom) {
    if (typeof this.kdp === "undefined") {
      return;
    }

    this.kdp.setKDPAttribute("mediaProxy.mediaPlayFrom", playFrom);
    this.kdp.sendNotification("changeMedia", { referenceId: idToSwichTo });
    this.kdp.kBind("mediaReady.switchVideos", () => {
      // we need to re-update speed this when we start playing without re-embdedding
      // (defaultSpeed isn't used after pause/play it seems)
      this.kdp.sendNotification(
        "playbackRateChangeSpeed",
        this.state.flashvars.playbackRateSelector.defaultSpeed
      );
      this.kdp.sendNotification("doSeek", playFrom);
      this.kdp.kUnbind("switchVideos.mediaReady");
    });

    // update the usage logger to start tracking the next reference ID
    if (this.logger) {
      this.logger.content_identifier = idToSwichTo;
    }
  }

  componentWillUnmount() {
    if (this.logger) {
      this.logger.finish();
    }
    if (typeof kWidget !== "undefined" && this.kdp) {
      kWidget.destroy(this.kdp);
      delete this.kdp;
    }
  }

  // Kaltura script failed to load.
  handleScriptError() {}

  subscribeToPlayerEvents(player) {
    const { onPlayerPlayEnd } = this.props;

    if (onPlayerPlayEnd) {
      player.kBind("playerPlayEnd", onPlayerPlayEnd.bind(null, player));
    }

    player.kBind("updatedPlaybackRate", this.onUpdatedPlaybackRate.bind(this));
    // player has switched to a new bitrate: http://player.kaltura.com/docs/api#switchingChangeComplete
    player.kBind(
      "switchingChangeComplete",
      this.onSwitchingChangeComplete.bind(this)
    );
  }

  getPlayer(playerId) {
    return document.getElementById(playerId);
  }

  onUpdatedPlaybackRate(rate) {
    if (typeof localStorage === "object") {
      localStorage.setItem(PREFERED_PLAYBACK_RATE_KEY, rate);
    }
    this.setState({
      flashvars: { playbackRateSelector: { defaultSpeed: rate } }
    });
  }

  onSwitchingChangeComplete(quality) {
    if (typeof localStorage === "object") {
      localStorage.setItem(PREFERED_PLAYBACK_QUALITY_KEY, quality);
    }
  }

  onPlayerReady(playerId) {
    this.kdp = this.getPlayer(playerId);

    const { logger, onPlayerReady } = this.props;

    if (logger) {
      const {
        work_identifier,
        work_format,
        content_identifier,
        content_format,
        paid_usage,
        client_session_id,
        user_profile_uuid,
        user_account_uuid,
        environment,
        client_name,
        client_version,
        authToken,
        onPostErrorFn,
        captureInterval
      } = logger;

      const inDevelopment =
        typeof window !== "undefined" && process.env.NODE_ENV === "development";
      const isDebugging = typeof window !== "undefined" && window.debugging;
      this.logger = new VideoUsageLogger(
        {
          environment,
          user_account_uuid,
          user_profile_uuid,
          client_session_id,
          paid_usage,
          client_name,
          client_version
        },
        {
          // TODO: remove these when the defaults in @oreilly/usages have been updated to be more frequent
          debugging: inDevelopment || isDebugging,
          authToken,
          onPostErrorFn,
          captureInterval
        }
      );

      this.logger.listenToPlayer(this.kdp, {
        work_identifier,
        work_format,
        content_identifier,
        content_format
      });
    }

    if (onPlayerReady) {
      onPlayerReady(this.kdp);
    }

    this.subscribeToPlayerEvents(this.kdp);

    const { playFromPercentage } = this.props;
    if (playFromPercentage && playFromPercentage > 0) {
      this.playFromPercentage(this.props.playFromPercentage);
    }
  }

  playFromPercentage(percentage) {
    if (percentage && this.kdp) {
      setTimeout(() => {
        const playFromSeconds = this.toSeconds(percentage, this.kdp);
        if (playFromSeconds >= this.props.minSecondsWatched) {
          this.kdp.sendNotification("doSeek", playFromSeconds);
        }
      }, 500);
    }
  }

  toSeconds(perc, kdp) {
    return (perc / 100) * kdp.evaluate("{duration}");
  }

  // Kaltura script has fully loaded.
  handleScriptLoad() {
    this.embedKalturaPlayer();
  }

  embedKalturaPlayer() {
    if (typeof kWidget === "undefined") {
      return;
    }

    const { session } = this.props;
    if (!session) {
      kWidget.embed(this.state);
      return;
    }

    const { flashvars } = this.state;
    this.setState(
      {
        flashvars: { ...flashvars, ks: session }
      },
      () => {
        kWidget.embed(this.state);
      }
    );
  }

  onStartPlayerClick(event) {
    event.preventDefault();

    this.setState(
      {
        showHero: false
      },
      () => {
        if (this.kdp) {
          this.kdp.sendNotification("doPlay");
        }
      }
    );
  }

  render() {
    const { uiconf_id, showHero } = this.state;

    const { partnerId, targetId, children, css = {} } = this.props;

    const { autoPlay } = this.state.flashvars;

    return (
      <div className="playerWrapper">
        {children &&
          showHero &&
          !autoPlay &&
          React.cloneElement(children, {
            onStartPlayerClick: this.onStartPlayerClick,
            partnerId
          })}
        <div id={targetId} className="player" />
        <Script
          url={`//cdnapisec.kaltura.com/p/${partnerId}/sp/${partnerId}00/embedIframeJs/uiconf_id/${uiconf_id}/partner_id/${partnerId}`}
          attributes={{ crossorigin: "anonymous" }}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad}
        />
      </div>
    );
  }
}

VideoPlayer.defaultProps = {
  previewEndDescription:
    "You may not have permission to view this clip in full.",
  previewEndTitle: "The preview has ended.",
  forceHDS: true,
  defaultSpeed: "1",
  defaultQuality: DEFAULT_BITRATE,
  speeds: ".5, .75, 1, 1.25, 1.5, 1.75, 2",
  autoPlay: true,
  autoMute: false,
  stretchVideo: false,
  partnerId: "1926081",
  uiConfId: "42930101",
  minSecondsWatched: 15
};

VideoPlayer.propTypes = {
  /**
   * Reference Id is an alternate unique identifier for media assets. Can be used instead of the entry id. The player will use the first found matching referenceId found.
   */
  referenceId: PropTypes.string.isRequired,
  /**
   * An HTML ID that exists in the DOM before rendering Kaltura javaScript. The player iframe will be embedded here. (e.g. `<div id="js-kaltura-player-region"></div>`)
   */
  targetId: PropTypes.string.isRequired,
  /**
   * A session string. This is required to play full clips.
   */
  session: PropTypes.string,
  /**
   * When true, stretchs the video to fill its container even if video aspect ratio breaks.
   */
  stretchVideo: PropTypes.bool,
  /**
   * Determine whether to start playback with volume muted (usually used by video ads or homepage auto play videos).
   */
  autoMute: PropTypes.bool,
  /**
   * Auto play single media (doesn't apply to [kaltura] playlists).
   */
  autoPlay: PropTypes.bool,
  /**
   * Determines the default playback speed.
   */
  defaultSpeed: PropTypes.string,
  /**
   * Determines the default playback quality. A higher value denotes higher quality.
   */
  defaultQuality: PropTypes.number,
  /**
   * Provide a string of decimals and integers that determine player controlled possible speed playbacks.
   */
  speeds: PropTypes.string,
  /**
   * The description displayed in the player when player finishes playing a preview.
   */
  previewEndDescription: PropTypes.string,
  /**
   * The title displayed in the player when player finishes playing a preview.
   */
  previewEndTitle: PropTypes.string,
  /**
   * When true, stretchs the video to fill its container even if video aspect ratio breaks.
   */
  forceHDS: PropTypes.bool,
  /**
   * The id of the current Kaltura partner.
   */
  partnerId: PropTypes.string,
  /**
   * The player uiConf id as provided by KMC (or by calling uiConf.add api).
   */
  uiConfId: PropTypes.string,
  /**
   * The player seconds to begin playing from.
   */
  playFromSeconds: PropTypes.string,
  /**
   * The player percentage to begin playing from.
   */
  playFromPercentage: PropTypes.number,
  /**
   * Minimum number of seconds to play from when using playFromPercentage.
   */
  minSecondsWatched: PropTypes.number,
  /**
   * Callback function that will be invoked when the player is ready to start.
   * Receives the kaltura player DOM node as an argument.
   */
  onPlayerReady: PropTypes.func,
  /**
   * Callback function that will be invoked when the player finishes playback.
   */
  onPlayerPlayEnd: PropTypes.func
};
