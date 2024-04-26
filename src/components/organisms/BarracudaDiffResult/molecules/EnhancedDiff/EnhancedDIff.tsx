import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import { Result } from 'antd'
import * as refractor from 'refractor'
import { parseDiff, Diff, DiffType, HunkData, useSourceExpansion, Hunk, tokenize } from 'react-diff-view'
import { diffLines, formatLines } from 'unidiff'
import { ExpandButton } from '../../atoms'
import 'react-diff-view/style/index.css'
import 'prism-themes/themes/prism-vs.css'

type TEnhancedDiffProps = {
  reference: string
  reseached: string
}

export const EnhancedDiff: FC<TEnhancedDiffProps> = ({ reference, reseached }) => {
  const [{ type, hunks }, setDiff] = useState<{ type: DiffType; hunks: HunkData[] }>({ type: 'add', hunks: [] })
  const [hunksWithSourceExpansion, expandCode] = useSourceExpansion(hunks, reference)

  useEffect(() => {
    const diffText = formatLines(diffLines(reference, reseached), {
      context: 3,
    })
    const [diff] = parseDiff(diffText, { nearbySequences: 'zip' })
    setDiff(diff)
  }, [reference, reseached])

  const tokens = useMemo(() => {
    const options = {
      refractor,
      highlight: true,
      language: 'json',
      oldSource: reference,
    }
    return tokenize(hunksWithSourceExpansion, options)
  }, [hunksWithSourceExpansion, reference])

  const renderHunk = useCallback(
    (output: React.ReactElement[], currentHunk: HunkData, index: number, hunks: HunkData[]) => {
      const previousHunk = hunks[index - 1]
      const nextHunk = hunks[index + 1]
      const previousEnd = previousHunk ? previousHunk.oldStart + previousHunk.oldLines : 1
      const currentStart = currentHunk.oldStart
      const currentEnd = currentHunk.oldStart + currentHunk.oldLines
      const nextStart = nextHunk ? nextHunk.oldStart : 1

      if ((index === 0 && previousEnd > 1) || currentStart - previousEnd > 10) {
        output.push(
          <ExpandButton
            key={`up-${currentHunk.content}`}
            direction="up"
            start={currentHunk.oldStart}
            lines={currentHunk.oldLines}
            onExpand={expandCode}
          />,
        )
      }
      output.push(<Hunk key={currentHunk.content} hunk={currentHunk} />)
      if (nextStart > currentEnd + 1) {
        output.push(
          <ExpandButton
            key={`down-${currentHunk.content}`}
            direction="down"
            start={currentHunk.oldStart}
            lines={currentHunk.oldLines}
            onExpand={expandCode}
          />,
        )
      }

      return output
    },
    [expandCode],
  )

  return (
    <>
      <Diff viewType="split" diffType={type} hunks={hunksWithSourceExpansion} tokens={tokens}>
        {hunks => hunks.reduce(renderHunk, [])}
      </Diff>
      {hunks.length === 0 && <Result status="success" title="No changes" />}
    </>
  )
}
