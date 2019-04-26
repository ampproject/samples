// =============================================
// =========== BEGIN ULTRA AMP HACK ============
// =============================================

const parseHandler = (item) => {
  const index = item.indexOf(':');
  const name = item.substr(0, index);
  const things = item.substr(index + 1);
  return [name.trim(), things.split(',')];
};

/**
 * DO NOT USE THIS.
 * @param {String} a First `on` handler.
 * @param {String} b Second `on` handler.
 * @returns {String} Only god knows.
 */
const mergeOnHandlers = (a, b) => {
  const out = {};

  const handleItem = (item) => {
    (item || '').split(';').forEach((handler) => {
      if (!handler) {
        return;
      }
      const [name, handlers] = parseHandler(handler);
      if (!out[name]) {
        out[name] = [];
      }
      out[name].push(...handlers);
    });
  };

  handleItem(a);
  handleItem(b);

  return Object.keys(out)
    .map((key) => {
      // May we be forgiven for the sins we are about to commit here.
      // As per https://github.com/ampproject/amphtml/blob/master/spec/amp-actions-and-events.md
      // we are only allowed to fire off one setState per handler. Why? Who knows.
      // But this makes composing handlers impossible. So we do the composition
      // here statically in the most insane, mind-bending way possible – by extracting
      // the targeted setState object values and concatenating them together.
      // This function was already horrible, now it's worse.
      let item = out[key].slice();
      const stateCalls = out[key]
        .map((item, i) => {
          return {
            index: i,
            state: /AMP.setState\(\{([^)]+)\}\)/m.exec(item),
          };
        })
        .filter((x) => !!x.state);
      const kvs = stateCalls
        .map((x) => {
          return x.state[1];
        })
        .join(',');
      if (kvs) {
        const obj = `AMP.setState({${kvs}})`;
        let injectedStateCalls = false;
        const newItem = [];
        item.forEach((x, i) => {
          if (stateCalls.find(({index}) => index === i)) {
            if (!injectedStateCalls) {
              injectedStateCalls = true;
              newItem.push(obj);
            }
          } else {
            newItem.push(x);
          }
        });
        item = newItem;
      }
      return `${key}:${item.join(',')}`;
    })
    .join(';');
};

export default mergeOnHandlers;

// =============================================
// ============ END ULTRA AMP HACK =============
// =============================================
