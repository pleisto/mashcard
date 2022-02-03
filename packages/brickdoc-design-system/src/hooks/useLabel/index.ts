import { AriaLabelingProps, DOMProps, LabelableProps } from '@react-types/shared'
import { ElementType, LabelHTMLAttributes } from 'react'
import { useId } from '../useId'

/**
 * Formed from https://github.com/adobe/react-spectrum
 * Copyright 2020 Adobe | Apache License
 */
export interface LabelAriaProps extends LabelableProps, DOMProps, AriaLabelingProps {
  /**
   * The HTML element used to render the label, e.g. 'label', or 'span'.
   * @default 'label'
   */
  labelElementType?: ElementType
}

export interface LabelAria {
  /** Props to apply to the label container element. */
  labelProps: LabelHTMLAttributes<HTMLLabelElement>
  /** Props to apply to the field container element being labeled. */
  fieldProps: AriaLabelingProps & DOMProps
}

/**
 * Merges aria-label and aria-labelledby into aria-labelledby when both exist.
 * @param props - Aria label props.
 * @param defaultLabel - Default value for aria-label when not present.
 * @see https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/utils/src/useLabels.ts
 */
export function useLabels(props: DOMProps & AriaLabelingProps, defaultLabel?: string): DOMProps & AriaLabelingProps {
  let { id, 'aria-label': label, 'aria-labelledby': labelledBy } = props

  // If there is both an aria-label and aria-labelledby,
  // combine them by pointing to the element itself.
  id = useId(id)
  if (labelledBy && label) {
    const ids = new Set([...labelledBy.trim().split(/\s+/), id])
    labelledBy = [...ids].join(' ')
  } else if (labelledBy) {
    labelledBy = labelledBy.trim().split(/\s+/).join(' ')
  }

  // If no labels are provided, use the default
  if (!label && !labelledBy && defaultLabel) {
    label = defaultLabel
  }

  return {
    id,
    'aria-label': label,
    'aria-labelledby': labelledBy
  }
}

/**
 * Provides the accessibility implementation for labels and their associated elements.
 * Labels provide context for user inputs.
 * @param props - The props for labels and fields.
 * @see https://github.com/adobe/react-spectrum/blob/main/packages/@react-aria/label/src/useLabel.ts
 */
export function useLabel(props: LabelAriaProps): LabelAria {
  let { id, label, 'aria-labelledby': ariaLabelledby, 'aria-label': ariaLabel, labelElementType = 'label' } = props

  id = useId(id)
  const labelId = useId()
  let labelProps = {}
  if (label) {
    ariaLabelledby = ariaLabelledby ? `${ariaLabelledby} ${labelId}` : labelId
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === 'label' ? id : undefined
    }
  }

  const fieldProps = useLabels({
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby
  })

  return {
    labelProps,
    fieldProps
  }
}
