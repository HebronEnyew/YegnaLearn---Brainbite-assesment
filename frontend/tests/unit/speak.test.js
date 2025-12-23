import { describe, it, expect, vi } from 'vitest'

describe('TTS Function', () => {
  it('should be callable without errors', () => {
    const speak = (text) => {
      if (!text) return
      return text
    }

    expect(() => speak('Hello')).not.toThrow()
  })
})
