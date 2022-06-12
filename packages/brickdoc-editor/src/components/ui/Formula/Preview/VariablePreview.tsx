import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableInterface } from '@brickdoc/formula'
import { FormulaEditor } from '../../../../editors/formulaEditor'
import { codeFragmentsToJSONContentTotal } from '../../../../helpers'
import { FormulaValue } from '../FormulaValue'

export interface VariablePreviewProps {
  variable: VariableInterface
  rootId: string
}

export const VariablePreview: React.FC<VariablePreviewProps> = ({ variable, rootId }) => {
  const content = variable.t.variableParseResult.valid
    ? codeFragmentsToJSONContentTotal(variable.t.variableParseResult.codeFragments)
    : { type: 'doc', content: [{ type: 'text', text: variable.t.variableParseResult.definition }] }

  return (
    <div className="formula-autocomplete-preview-variable">
      <div className="autocomplete-preview-name">{variable.t.meta.name}</div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Definition</div>
        <div className="autocomplete-preview-definition">
          <FormulaEditor content={content} editable={false} />
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
