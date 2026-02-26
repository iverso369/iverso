import { type ReactNode } from 'react'
import './WorkflowNode.css'

interface WorkflowNodeProps {
  icon: ReactNode
  title: string
  active?: boolean
  onClick?: () => void
}

export default function WorkflowNode({ icon, title, active = false, onClick }: WorkflowNodeProps) {
  return (
    <button
      className={`workflow-node${active ? ' workflow-node--active' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="workflow-node__icon">
        {icon}
      </div>
      <span className="workflow-node__title">{title}</span>
    </button>
  )
}
