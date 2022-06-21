import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableInterface } from '@mashcard/formula'
import { ReadonlyFormulaEditor } from '../../../../editors/formulaEditor'
import { codeFragments2content, definition2content } from '../../../../helpers'
import { FormulaValue } from '../FormulaValue'

export interface VariablePreviewProps {
  variable: VariableInterface
  rootId: string
}

export const VariablePreview: React.FC<VariablePreviewProps> = ({ variable, rootId }) => {
  const content = variable.t.variableParseResult.valid
    ? codeFragments2content(variable.t.variableParseResult.codeFragments, true)[0]
    : definition2content(variable.t.variableParseResult.definition, true)[0]

  return (
    <div className="formula-autocomplete-preview-variable">
      <div className="autocomplete-preview-name">{variable.t.meta.name}</div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Definition</div>
        <div className="autocomplete-preview-definition">
          <ReadonlyFormulaEditor content={content} />
        </div>
      </div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Type</div>
        <span className="autocomplete-preview-input-tag">{fetchResult(variable.t).type}</span>
      </div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Value</div>
        <span className="autocomplete-preview-output-tag">
          <FormulaValue
            displayData={dumpDisplayResultForDisplay(variable.t)}
            display={displayValue(fetchResult(variable.t), rootId)}
          />
        </span>
      </div>
    </div>
  )
}
