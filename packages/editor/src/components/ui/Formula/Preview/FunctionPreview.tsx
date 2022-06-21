import { AnyFunctionClause } from '@mashcard/formula'
import { ReadonlyFormulaEditor } from '../../../../editors/formulaEditor'
import { codeFragments2content } from '../../../../helpers'

export interface FunctionPreviewProps {
  functionClause: AnyFunctionClause
  rootId: string
}

export const FunctionPreview: React.FC<FunctionPreviewProps> = ({ functionClause, rootId }) => {
  return (
    <div className="formula-autocomplete-preview-function">
      <div className="autocomplete-preview-name">
        {functionClause.name} (
        {functionClause.args.map((arg, index) => (
          <span className="autocomplete-preview-arg" key={arg.name}>
            {arg.name}
            {index !== functionClause.args.length - 1 && (
              <span className="autocomplete-preview-arg-separator"> , </span>
            )}
          </span>
        ))}
        )
      </div>
      <div className="autocomplete-preview-desc">{functionClause.description}</div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Inputs</div>
        {functionClause.args.length > 0
          ? functionClause.args.map(arg => (
              <div key={arg.name} className="autocomplete-preview-inputs-arg">
                <span className="autocomplete-preview-input-tag">{arg.name}</span> : {arg.type}
              </div>
            ))
          : 'None.'}
      </div>
      <div className="autocomplete-preview-section">
        <div className="autocomplete-preview-section-head">Outputs</div>
        {functionClause.returns ? (
          <span className="autocomplete-preview-output-tag">{functionClause.returns}</span>
        ) : (
          'None.'
        )}
      </div>
      {functionClause.examples.length > 0 && (
        <div className="autocomplete-preview-section">
          <div className="autocomplete-preview-section-head">Example</div>
          {functionClause.examples.map((example, index) => (
            <div key={index} className="autocomplete-preview-example">
              <ReadonlyFormulaEditor content={codeFragments2content(example.codeFragments, true)[0]} />
              <br />
              <span className="autocomplete-preview-example-result">={JSON.stringify(example?.output?.result)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
