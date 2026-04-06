class Planner:
    def planner(self, analysis):
        return self.plan_reply(analysis)

    def plan_reply(self, analysis):
        if not analysis:
            return self._default_plan()

        if not isinstance(analysis, dict):
            return self._default_plan()

        emotion = str(analysis.get("emotion", "")).strip().lower()
        intent = str(analysis.get("intent", "")).strip().lower()
        relationship = str(analysis.get("relationship", "")).strip().lower()
        tone = str(analysis.get("tone", "")).strip().lower()

        if emotion == "negative":
            return {
                "tone": "gentle",
                "strategy": "comfort",
                "style": "emotional_support",
                "count": 2
            }

        if intent == "question":
            return {
                "tone": "helpful",
                "strategy": "answer",
                "style": "clear",
                "count": 3
            }

        if relationship == "tinh cam":
            return {
                "tone": "flirty",
                "strategy": "engage",
                "style": "playful",
                "count": 3
            }

        if relationship == "dong nghiep":
            return {
                "tone": "formal",
                "strategy": "professional",
                "style": "polite",
                "count": 2
            }

        if emotion == "positive":
            return {
                "tone": "friendly",
                "strategy": "continue",
                "style": "casual",
                "count": 3
            }

        if tone in {"formal", "friendly", "flirty", "serious"}:
            plan = self._default_plan()
            plan["tone"] = tone
            return plan

        return self._default_plan()
    
    def _default_plan(self):
        return {
            "tone": "friendly",
            "strategy": "normal",
            "style": "casual",
            "count": 3
        }
