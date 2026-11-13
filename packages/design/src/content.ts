// React renders nothing for these, so a part given `{item && <Thing />}` without an item treats that content as absent.
export const isEmptyContent = (content: unknown): boolean =>
  content == null || typeof content === 'boolean' || content === ''
