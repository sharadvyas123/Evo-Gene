from pydantic import BaseModel, Field
from typing import Literal

# --- IMPORTANT NOTE ---
# You must install Pydantic for this to work: pip install pydantic
# ----------------------

class VariantInputSchema(BaseModel):
    """
    Defines the exact structure required by the external Evo2 Variant Analysis API.
    Used to instruct the LLM on the required JSON output format.
    """
    
    chromosome: str = Field(
        ..., 
        description="The chromosome identifier for the variant, e.g., 'chr12'."
    )
    
    variant_position: int = Field(
        ..., 
        description="The numerical base pair position of the variant on the chromosome."
    )
    
    alternative: str = Field(
        ..., 
        description="The alternative allele (single nucleotide, e.g., 'G', 'T')."
    )
    
    genome: Literal["hg38", "hg19"] = Field(
        "hg38", 
        description="The genome assembly build. Defaults to hg38 if not specified by the user."
    )