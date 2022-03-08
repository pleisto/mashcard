import { displayValue, dumpDisplayResultForDisplay, fetchResult, VariableInterface } from '@brickdoc/formula'
import { FormulaEditor } from '../../../extensions/formula/FormulaEditor/FormulaEditor'
import { codeFragmentsToJSONContentTotal } from '../../../helpers'
import { FormulaValue } from '../FormulaValue'

export interface VariablePreviewProps {
  variable: VariableInterface
  blockId: string
}

export const VariablePreview: React.FC<VariablePreviewProps> = ({ variable, blockId }) => {
  const content = variable.t.valid
    ? codeFragmentsToJSONContentTotal(variable.t.codeFragments)
    : { type: 'doc', content: [{ type: 'text', text: variable.t.definition }] }

  return (
    <div className="formula-autocomplete-preview-variable">
      <div className="autocomplete-preview-name">{variable.t.name}</div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Definition</div>
        <div className="autocomplete-preview-definition">
          <FormulaEditor editorContent={{ content, input: '', position: 0 }} editable={false} />
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
            display={displayValue(fetchResult(variable.t), blockId)}
          />
        </span>
      </div>
    </div>
  )
}
