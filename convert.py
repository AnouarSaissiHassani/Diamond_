import re

source_path = r"C:\Users\omen\Downloads\Skin Clinic Website Design (1)\src\app\pages\Treatments.tsx"
target_path = r"D:\antigravity webapp\Diamond\src\app\soins\page.tsx"

with open(source_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add "use client" and fix imports
content = '"use client";\n' + content
content = content.replace('import { motion } from "motion/react";', 'import { motion } from "framer-motion";')
content = content.replace('import { Link } from "react-router";', 'import Link from "next/link";')

# Remove Accordion imports properly
content = re.sub(r'import\s+\{[^}]*Accordion[^}]*\}\s+from\s+"../components/ui/accordion";', '', content)

# 2. Add SimpleAccordion component
simple_accordion = """
function SimpleAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: i * 0.08 }}
          className="border bg-white"
          style={{ borderColor: "#e7e5e4", paddingLeft: 24, paddingRight: 24 }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full py-5 text-left text-stone-800 flex justify-between items-center hover:text-stone-600 transition-colors"
            style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}
          >
            {faq.question}
            <span>{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="pb-5 text-stone-500 leading-relaxed" style={{ fontSize: "0.875rem" }}>
              {faq.answer}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
"""

content = content.replace('const faqs = [', simple_accordion + '\nconst faqs = [')

# 3. Replace the Accordion usage with SimpleAccordion
accordion_usage = r'<Accordion type="single" collapsible className="space-y-3">.*?</Accordion>'
content = re.sub(accordion_usage, '<SimpleAccordion faqs={faqs} />', content, flags=re.DOTALL)

# 4. Replace <Link to="..."> with <Link href="...">
content = content.replace('to="/rendez-vous"', 'href="/rendez-vous"')
content = content.replace('to="/"', 'href="/"')

# 5. Export default
content = content.replace('export function Treatments()', 'export default function Soins()')

with open(target_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Conversion complete!")
