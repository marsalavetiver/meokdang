// 앱인토스 번들에만 들어가는 작은 다리. 사이트(app.js)는 window.__AIT__가 있을 때만 토스 기능을 쓴다.
import { openURL } from '@apps-in-toss/web-framework';

window.__AIT__ = { openURL };
