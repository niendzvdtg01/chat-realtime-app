from Models.AI import AI

class Analyzer:
    def __init__(self):
        self.ai = AI()
    
    def _build_prompt(self, context):
        return f"""
            Ban la AI phan tich hoi thoai.

                Phan tich conversation sau:
                \"\"\"
                {context}
                \"\"\"

            Tra ve DUY NHAT JSON hop le, KHONG giai thich:

            {{
                "intent": "y dinh chinh cua nguoi noi",
                "emotion": "cam xuc (positive | neutral | negative)",
                "relationship": "moi quan he (ban be | dong nghiep | tinh cam | khach hang | khac)",
                  "tone": "tong giong hoi thoai (friendly | formal | flirty | serious | ...)"
            }}
            """

    def analyze(self, context):
        prompt = f"""
        Hay phan tich conversation sau
        {context}

        Ruturn JSON:
        - y dinh
        - cam xuc
        - moi quan he
        - tong giong
        """
        results = self.ai.generate(prompt=prompt)
        return results